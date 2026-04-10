const mysql = require('mysql2/promise');

const config = {
    host: 'localhost',
    user: 'root',
    password: 'Sonali', // Default root password
    database: 'throtlegarage',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    port: 3306
};

// Create the connection pool
const pool = mysql.createPool(config);

// Test database connection with better error handling
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('Successfully connected to MySQL database');

        // Create database if it doesn't exist
        await connection.query('CREATE DATABASE IF NOT EXISTS throtlegarage');
        await connection.query('USE throtlegarage');

        connection.release();
        return true;
    } catch (error) {
        console.error('Error connecting to database:', error);
        console.log('Please check if:');
        console.log('1. MySQL is running');
        console.log('2. Password is correct (current: root)');
        console.log('3. Port 3306 is available');
        return false;
    }
}

// Initialize database connection with retry
async function initializeWithRetry(maxRetries = 5) {
    for (let i = 0; i < maxRetries; i++) {
        const success = await testConnection();
        if (success) {
            await initDatabase();
            return;
        }
        console.log(`Retry attempt ${i + 1} of ${maxRetries}`);
        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds before retry
    }
    console.error('Failed to connect to database after multiple attempts');
}

// Create tables if they don't exist
async function initDatabase() {
    let connection;
    try {
        connection = await pool.getConnection();

        // Create users table first (since other tables depend on it)
        await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                fullName VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                role ENUM('user', 'admin') DEFAULT 'user',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                status ENUM('active', 'inactive') DEFAULT 'active'
            )
        `);

        // Create trade_listings table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS trade_listings (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                title VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                \`condition\` ENUM('New', 'Like New', 'Good', 'Fair', 'Poor') NOT NULL,
                price DECIMAL(10, 2) NOT NULL,
                trade_preference VARCHAR(255),
                category ENUM('Engine Parts', 'Body Parts', 'Accessories', 'Electronics', 'Other') NOT NULL,
                images JSON,
                status ENUM('Active', 'Pending', 'Sold', 'Traded', 'Inactive') DEFAULT 'Active',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `);

        // Create trade_messages table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS trade_messages (
                id INT AUTO_INCREMENT PRIMARY KEY,
                listing_id INT NOT NULL,
                sender_id INT NOT NULL,
                receiver_id INT NOT NULL,
                message TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (listing_id) REFERENCES trade_listings(id) ON DELETE CASCADE,
                FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `);

        // Create contact_messages table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS contact_messages (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                subject VARCHAR(255) NOT NULL,
                message TEXT NOT NULL,
                status ENUM('new', 'read', 'replied') DEFAULT 'new',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        // Create products table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS products (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                description TEXT,
                price DECIMAL(10, 2) NOT NULL,
                category VARCHAR(100) NOT NULL,
                image_url VARCHAR(255),
                stock INT DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        // Create orders table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS orders (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                total_amount DECIMAL(10, 2) NOT NULL,
                status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
                payment_status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
                payment_method ENUM('cod', 'upi', 'card', 'netbanking') NOT NULL,
                shipping_address JSON NOT NULL,
                tracking_number VARCHAR(100),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id)
            )
        `);

        // Drop foreign key constraint on product_id in order_items if it exists
        try {
            await connection.query(`ALTER TABLE order_items DROP FOREIGN KEY order_items_ibfk_2`);
        } catch (e) {
            if (!e.message.includes('check that column/key exists')) throw e;
        }
        // Drop foreign key constraint on product_id in return_items if it exists
        try {
            await connection.query(`ALTER TABLE return_items DROP FOREIGN KEY return_items_ibfk_2`);
        } catch (e) {
            if (!e.message.includes('check that column/key exists')) throw e;
        }
        // Create order items table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS order_items (
                id INT AUTO_INCREMENT PRIMARY KEY,
                order_id INT NOT NULL,
                product_id INT NOT NULL,
                quantity INT NOT NULL,
                price DECIMAL(10, 2) NOT NULL,
                custom_data JSON NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (order_id) REFERENCES orders(id)
            )
        `);

        // Create returns table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS returns (
                id INT AUTO_INCREMENT PRIMARY KEY,
                order_id INT NOT NULL,
                user_id INT NOT NULL,
                reason TEXT NOT NULL,
                status ENUM('pending', 'approved', 'rejected', 'completed') DEFAULT 'pending',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (order_id) REFERENCES orders(id),
                FOREIGN KEY (user_id) REFERENCES users(id)
            )
        `);

        // Create return items table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS return_items (
                id INT AUTO_INCREMENT PRIMARY KEY,
                return_id INT NOT NULL,
                product_id INT NOT NULL,
                quantity INT NOT NULL,
                reason TEXT,
                custom_data JSON NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (return_id) REFERENCES returns(id)
            )
        `);
        // Ensure custom_data column exists (for upgrades)
        await connection.query(`ALTER TABLE return_items ADD COLUMN custom_data JSON NULL`)
            .catch(e => { if (!e.message.includes('Duplicate column')) throw e; });

        // Insert default admin user if not exists
        const [users] = await connection.query('SELECT * FROM users WHERE email = ?', ['admin@throtlegarage.com']);
        if (!users.length) {
            const bcrypt = require('bcryptjs');
            const hashedPassword = await bcrypt.hash('admin123', 10);
            await connection.query(
                'INSERT INTO users (fullName, email, password, role) VALUES (?, ?, ?, ?)', ['Admin User', 'admin@throtlegarage.com', hashedPassword, 'admin']
            );
            console.log('Default admin user created');
        }

        console.log('Database tables initialized successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
        throw error;
    } finally {
        if (connection) connection.release();
    }
}

// Start initialization with retry
initializeWithRetry().catch(console.error);

module.exports = { pool, config, initDatabase };