const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../config/database');

// Middleware to verify admin token
const verifyAdminToken = (req, res, next) => {
    const token = req.header('auth-token');
    console.log('Received admin token:', token);
    if (!token) {
        console.log('No token provided');
        return res.status(401).json({ message: 'Access Denied' });
    }
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET || 'superbike-mods-secret-key');
        console.log('Decoded token payload:', verified);
        if (!verified.isAdmin) {
            console.log('Token does not have isAdmin: true');
            return res.status(403).json({ message: 'Not authorized as an admin' });
        }
        req.user = verified;
        next();
    } catch (err) {
        console.log('Token verification error:', err);
        res.status(400).json({ message: 'Invalid Token', error: err.message });
    }
};

// Admin login
router.post('/login', async(req, res) => {
    try {
        const { username, password } = req.body;

        // For demo purposes, using a hardcoded admin credential
        // In production, this should be authenticated against a database
        if (username === 'admin' && password === 'admin123') {
            // Create and assign a token
            const token = jwt.sign({ id: 'admin', isAdmin: true },
                process.env.JWT_SECRET || 'superbike-mods-secret-key', { expiresIn: '1h' }
            );

            return res.json({
                success: true,
                token,
                user: {
                    id: 'admin',
                    username: 'admin',
                    isAdmin: true
                }
            });
        }

        return res.status(401).json({ message: 'Invalid username or password' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get dashboard stats
router.get('/stats', verifyAdminToken, async(req, res) => {
    try {
        // Total Orders
        const [
            [{ totalOrders }]
        ] = await db.pool.query('SELECT COUNT(*) as totalOrders FROM orders');
        // Total Revenue (completed or delivered orders)
        const [
            [{ totalRevenue }]
        ] = await db.pool.query("SELECT IFNULL(SUM(total_amount),0) as totalRevenue FROM orders WHERE status IN ('completed','delivered')");
        // Total Users
        const [
            [{ totalUsers }]
        ] = await db.pool.query('SELECT COUNT(*) as totalUsers FROM users');
        // Orders last month
        const [
            [{ lastMonthOrders }]
        ] = await db.pool.query("SELECT COUNT(*) as lastMonthOrders FROM orders WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)");
        // Revenue last month
        const [
            [{ lastMonthRevenue }]
        ] = await db.pool.query("SELECT IFNULL(SUM(total_amount),0) as lastMonthRevenue FROM orders WHERE status IN ('completed','delivered') AND created_at >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)");
        // Users last month
        const [
            [{ lastMonthUsers }]
        ] = await db.pool.query("SELECT COUNT(*) as lastMonthUsers FROM users WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)");
        // Conversion rate (dummy, unless you track sessions)
        const conversionRate = 3.2;
        // Trends (percent change from previous month)
        const [
            [{ prevMonthOrders }]
        ] = await db.pool.query("SELECT COUNT(*) as prevMonthOrders FROM orders WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 2 MONTH) AND created_at < DATE_SUB(CURDATE(), INTERVAL 1 MONTH)");
        const [
            [{ prevMonthRevenue }]
        ] = await db.pool.query("SELECT IFNULL(SUM(total_amount),0) as prevMonthRevenue FROM orders WHERE status IN ('completed','delivered') AND created_at >= DATE_SUB(CURDATE(), INTERVAL 2 MONTH) AND created_at < DATE_SUB(CURDATE(), INTERVAL 1 MONTH)");
        const [
            [{ prevMonthUsers }]
        ] = await db.pool.query("SELECT COUNT(*) as prevMonthUsers FROM users WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 2 MONTH) AND created_at < DATE_SUB(CURDATE(), INTERVAL 1 MONTH)");
        // Calculate trends
        function trend(current, prev) {
            if (prev === 0) return current > 0 ? 100 : 0;
            return Math.round(((current - prev) / prev) * 100);
        }
        res.json({
            totalOrders,
            totalRevenue,
            totalUsers,
            conversionRate,
            ordersTrend: trend(lastMonthOrders, prevMonthOrders),
            revenueTrend: trend(lastMonthRevenue, prevMonthRevenue),
            usersTrend: trend(lastMonthUsers, prevMonthUsers),
            conversionTrend: -1 // Dummy
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all orders
router.get('/orders', verifyAdminToken, async(req, res) => {
    try {
        // Get all orders with user info
        const [ordersRaw] = await db.pool.query(`
            SELECT o.*, u.fullName as customer, u.email, u.id as userId
            FROM orders o
            JOIN users u ON o.user_id = u.id
            ORDER BY o.created_at DESC
        `);
        // Get all order items for these orders
        const orderIds = ordersRaw.map(o => o.id);
        let itemsRaw = [];
        if (orderIds.length) {
            [itemsRaw] = await db.pool.query(`
                SELECT oi.*, p.name as product_name, p.image_url
                FROM order_items oi
                LEFT JOIN products p ON oi.product_id = p.id
                WHERE oi.order_id IN (${orderIds.map(() => '?').join(',')})
            `, orderIds);
        }
        // Group items by order
        const itemsByOrder = {};
        for (const item of itemsRaw) {
            if (!itemsByOrder[item.order_id]) itemsByOrder[item.order_id] = [];
            itemsByOrder[item.order_id].push({
                id: item.product_id,
                name: item.product_name,
                price: item.price,
                quantity: item.quantity,
                image: item.image_url
            });
        }
        // Format orders
        const orders = ordersRaw.map(order => ({
            id: order.id,
            customer: order.customer,
            email: order.email,
            date: order.created_at.toISOString().split('T')[0],
            amount: Number(order.total_amount),
            status: order.status,
            items: itemsByOrder[order.id] || [],
            address: order.shipping_address,
            phone: null // Add if you store phone
        }));
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// // Get a specific order
// router.get('/orders/:id', verifyAdminToken, async(req, res) => {
//     try {
//         const orderId = req.params.id;

//         // For demo purposes, return dummy order
//         // In production, this would come from the database
//         const order = {
//             id: orderId,
//             customer: 'John Doe',
//             email: 'john.doe@example.com',
//             date: '2024-05-15',
//             amount: 432.99,
//             status: 'completed',
//             items: [
//                 { id: 1, name: 'Racing Exhaust System', price: 899.99, quantity: 1 },
//                 { id: 2, name: 'Performance ECU Tuner', price: 699.99, quantity: 1 }
//             ],
//             address: '123 Main St, New York, NY 10001',
//             phone: '(555) 123-4567'
//         };

//         res.json(order);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

router.get('/orders/:id', verifyAdminToken, async(req, res) => {
    try {
        const orderId = req.params.id;

        // Get order + user
        const [
            [order]
        ] = await db.pool.query(`
            SELECT o.*, u.fullName as customer, u.email
            FROM orders o
            JOIN users u ON o.user_id = u.id
            WHERE o.id = ?
        `, [orderId]);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json({
            id: order.id,
            customer: order.customer,
            email: order.email,
            date: order.created_at.toISOString().split('T')[0],
            amount: Number(order.total_amount),
            status: order.status,
            address: order.shipping_address
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update an order
router.put('/orders/:id', verifyAdminToken, async(req, res) => {
    try {
        const orderId = req.params.id;
        let { status } = req.body;

        // ✅ Map frontend values to DB values
        if (status === 'completed') status = 'delivered';
        if (status === 'rejected') status = 'cancelled';

        await db.pool.query(
            'UPDATE orders SET status = ? WHERE id = ?', [status, orderId]
        );

        res.json({
            success: true,
            message: 'Order updated successfully'
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

});

// Delete an order
router.delete('/orders/:id', verifyAdminToken, async(req, res) => {
    try {
        const orderId = req.params.id;

        // Delete order items first (important for foreign key)
        await db.pool.query(
            'DELETE FROM order_items WHERE order_id = ?', [orderId]
        );

        // Delete order
        const [result] = await db.pool.query(
            'DELETE FROM orders WHERE id = ?', [orderId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json({ success: true, message: 'Order deleted successfully' });
    } catch (err) {
        console.error('Delete error:', err);
        res.status(500).json({ message: 'Database error' });
    }
});

// Get all users
router.get('/users', verifyAdminToken, async(req, res) => {
    try {
        const [users] = await db.pool.query(
            'SELECT id, fullName as name, email, created_at as registeredDate, status FROM users ORDER BY created_at DESC'
        );
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a specific user
router.get('/users/:id', verifyAdminToken, async(req, res) => {
    try {
        const userId = req.params.id;

        // For demo purposes, return dummy user
        // In production, this would come from the database
        const user = {
            id: userId,
            name: 'John Doe',
            email: 'john.doe@example.com',
            registeredDate: '2024-01-15',
            status: 'active',
            orders: 5,
            phone: '(555) 123-4567',
            address: '123 Main St, New York, NY 10001'
        };

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a user
router.put('/users/:id', verifyAdminToken, async(req, res) => {
    try {
        const userId = req.params.id;
        const { status } = req.body;

        // For demo purposes, just return success
        // In production, this would update the database
        res.json({
            success: true,
            message: `User ${userId} updated successfully`,
            user: {
                id: userId,
                status
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all products
router.get('/products', verifyAdminToken, async(req, res) => {
    try {
        // For demo purposes, return dummy products
        // In production, this would come from the database
        const products = [{
                id: 'PRD-001',
                name: 'Racing Exhaust System',
                category: 'Exhaust',
                price: 899.99,
                stock: 15
            },
            {
                id: 'PRD-002',
                name: 'Performance ECU Tuner',
                category: 'Electronics',
                price: 699.99,
                stock: 8
            }
        ];

        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a specific product
router.get('/products/:id', verifyAdminToken, async(req, res) => {
    try {
        const productId = req.params.id;

        // For demo purposes, return dummy product
        // In production, this would come from the database
        const product = {
            id: productId,
            name: 'Racing Exhaust System',
            category: 'Exhaust',
            price: 899.99,
            stock: 15,
            description: 'High-performance racing exhaust system',
            compatibility: ['BMW S1000RR', 'Ducati Panigale V4'],
            image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=600&q=80'
        };

        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a product
router.put('/products/:id', verifyAdminToken, async(req, res) => {
    try {
        const productId = req.params.id;
        const { price, stock } = req.body;

        // For demo purposes, just return success
        // In production, this would update the database
        res.json({
            success: true,
            message: `Product ${productId} updated successfully`,
            product: {
                id: productId,
                price,
                stock
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;