const db = require('./config/database');

async function removeForeignKey() {
    try {
        console.log('Removing foreign key constraint from order_items table...');
        
        // First, let's see what foreign keys exist
        const [foreignKeys] = await db.pool.query(`
            SELECT CONSTRAINT_NAME 
            FROM information_schema.KEY_COLUMN_USAGE 
            WHERE TABLE_SCHEMA = 'throtlegarage' 
            AND TABLE_NAME = 'order_items' 
            AND REFERENCED_TABLE_NAME = 'products'
        `);
        
        console.log('Found foreign keys:', foreignKeys);
        
        if (foreignKeys.length > 0) {
            // Remove the foreign key constraint
            for (const fk of foreignKeys) {
                console.log(`Removing foreign key: ${fk.CONSTRAINT_NAME}`);
                await db.pool.query(`
                    ALTER TABLE order_items 
                    DROP FOREIGN KEY ${fk.CONSTRAINT_NAME}
                `);
            }
            console.log('✅ Foreign key constraints removed successfully!');
        } else {
            console.log('ℹ️  No foreign key constraints found');
        }
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error removing foreign key constraint:', error);
        process.exit(1);
    }
}

removeForeignKey(); 