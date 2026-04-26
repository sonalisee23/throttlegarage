const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool, config: dbConfig } = require('./config/database');
const path = require('path');
const mysql = require('mysql2/promise');
const { initDatabase } = require('./config/database');
const fetch = require('node-fetch');
const Return = require('./models/Return');

// Import routes
const productRoutes = require('./routes/products');
const stockRoutes = require('./routes/stock');
const contactRoutes = require('./routes/contact');
const orderRoutes = require('./routes/orders');
const tradeRoutes = require('./routes/trade');
const cartRoutes = require('./routes/cart');
const adminRoutes = require('./routes/admin');
const reviewRoutes = require('./routes/reviews');


const app = express();
const PORT = 5001;
const JWT_SECRET = process.env.JWT_SECRET || 'superbike-mods-secret-key';

// Authentication middleware (MySQL)
const authenticateToken = async(req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        const [rows] = await pool.query('SELECT id, email, fullName, role FROM users WHERE id = ?', [decoded.id]);
        if (!rows.length) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = rows[0];
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
};

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Add debugging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// API Routes - Place these BEFORE static file serving
app.use('/api/products', productRoutes);
app.use('/api/stock', stockRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/orders', authenticateToken, orderRoutes);
app.use('/api/trade', tradeRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/reviews', reviewRoutes);

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

// Test database connection before starting server
async function startServer() {
    try {
        // Test database connection
        const connection = await pool.getConnection();
        console.log('Successfully connected to MySQL database');
        connection.release();

        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            console.log(`Visit http://localhost:${PORT} in your browser`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

app.get('/api/cart', (req, res) => {
    res.json([]);
});

// Register (MySQL)
app.post('/api/auth/register', async(req, res) => {
    try {
        console.log('Registration attempt:', req.body);
        const { fullName, email, password } = req.body;
        if (!fullName || !email || !password) {
            console.log('Missing fields:', { fullName, email, password });
            return res.status(400).json({ message: 'All fields are required' });
        }
        const [existingUsers] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
        console.log('Existing users with this email:', existingUsers);
        if (existingUsers.length) {
            console.log('Email already registered:', email);
            return res.status(400).json({ message: 'Email already registered' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Hashed password:', hashedPassword);
        const [insertResult] = await pool.query(
            'INSERT INTO users (fullName, email, password) VALUES (?, ?, ?)', [fullName, email, hashedPassword]
        );
        console.log('Insert result:', insertResult);
        res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Login (MySQL)
app.post('/api/auth/login', async(req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (!users.length) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const user = users[0];
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '24h' });
        res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                fullName: user.fullName,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Password update endpoint
app.put('/api/users/password', authenticateToken, async(req, res) => {
    try {
        const userId = req.user.id;
        const { currentPassword, newPassword } = req.body;
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ message: 'Both current and new password are required' });
        }
        // Get user from DB
        const [users] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);
        if (!users.length) {
            return res.status(404).json({ message: 'User not found' });
        }
        const user = users[0];
        // Check current password
        const valid = await bcrypt.compare(currentPassword, user.password);
        if (!valid) {
            return res.status(401).json({ message: 'Current password is incorrect' });
        }
        // Hash and update new password
        const hashed = await bcrypt.hash(newPassword, 10);
        await pool.query('UPDATE users SET password = ? WHERE id = ?', [hashed, userId]);
        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Update user profile endpoint
app.put('/api/users/profile', authenticateToken, async(req, res) => {
    try {
        const userId = req.user.id;
        const { fullName, email, phone } = req.body;
        await pool.query(
            'UPDATE users SET fullName = ?, email = ?, phone = ? WHERE id = ?', [fullName, email, phone, userId]
        );
        res.json({ message: 'Profile updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get all users (for admin/forgot password functionality)
app.get('/api/users', async(req, res) => {
    try {
        const [users] = await pool.query('SELECT id, fullName, email, phone, role FROM users');
        res.json({ users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Reset password endpoint (for forgot password)
app.post('/api/auth/reset-password', async(req, res) => {
    try {
        const { email, newPassword } = req.body;

        if (!email || !newPassword) {
            return res.status(400).json({ message: 'Email and new password are required' });
        }

        // Check if user exists
        const [users] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
        if (!users.length) {
            return res.status(404).json({ message: 'No account found with this email address' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the password
        await pool.query('UPDATE users SET password = ? WHERE email = ?', [hashedPassword, email]);

        console.log(`Password reset successful for email: ${email}`);
        res.json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error('Password reset error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});
// app.post('/api/return', (req, res) => {
//     const { order_id, product_id, user_id, reason } = req.body;

//     Return.createReturn({ order_id, product_id, user_id, reason }, (err) => {
//         if (err) return res.status(500).json(err);
//         res.json({ message: "Return submitted" });
//     });
// });

app.post('/api/return', (req, res) => {
    const { order_id, product_id, user_id, reason } = req.body;

    if (!Number.isInteger(Number(order_id))) {
        return res.status(400).json({ message: "Invalid order_id" });
    }

    if (!Number.isInteger(Number(product_id))) {
        return res.status(400).json({ message: "Invalid product_id" });
    }

    if (!Number.isInteger(Number(user_id))) {
        return res.status(400).json({ message: "Invalid user_id" });
    }

    Return.createReturn({ order_id, product_id, user_id, reason }, (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Return submitted" });
    });
});

app.get('/api/admin/returns', (req, res) => {
    Return.getAllReturns((err, data) => {
        if (err) return res.status(500).json(err);
        res.json(data);
    });
});

app.put('/api/admin/return/:id', (req, res) => {
    const { status } = req.body;

    Return.updateReturnStatus(req.params.id, status, (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Updated" });
    });
});

// 🔥 USER RETURNS API (PASTE HERE)
app.get('/api/user/returns/:userId', (req, res) => {
    const userId = req.params.userId;

    const sql = `
        SELECT * FROM returns
        WHERE user_id = ?
        ORDER BY id DESC
    `;

    pool.query(sql, [userId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json(err);
        }

        res.json(results);
    });
});

// Start server and initialize tables
(async() => {
    try {
        await initDatabase();
        await startServer();
    } catch (error) {
        console.error('Failed to initialize application:', error);
        process.exit(1);
    }
})();

module.exports = app;