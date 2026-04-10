const db = require('./config/database');

async function createCartTable() {
    try {
        console.log('Creating cart table...');
        
        // Create cart table
        await db.pool.query(`
            CREATE TABLE IF NOT EXISTS cart_items (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                product_id INT NOT NULL,
                quantity INT NOT NULL DEFAULT 1,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
                UNIQUE KEY unique_user_product (user_id, product_id)
            )
        `);
        
        console.log('✅ Cart table created successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error creating cart table:', error);
        process.exit(1);
    }
}

createCartTable(); 