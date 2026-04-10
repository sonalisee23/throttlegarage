const db = require('./config/database');

async function addCustomDataColumn() {
    try {
        console.log('Adding custom_data column to order_items table...');
        
        // Add custom_data column to order_items table
        await db.pool.query(`
            ALTER TABLE order_items 
            ADD COLUMN custom_data JSON NULL
        `);
        
        console.log('✅ custom_data column added to order_items table!');
        
        console.log('Adding custom_data column to return_items table...');
        
        // Add custom_data column to return_items table
        await db.pool.query(`
            ALTER TABLE return_items 
            ADD COLUMN custom_data JSON NULL
        `);
        
        console.log('✅ custom_data column added to return_items table!');
        console.log('📝 These columns will store local product information for bike parts with string IDs');
        process.exit(0);
    } catch (error) {
        if (error.code === 'ER_DUP_FIELDNAME') {
            console.log('ℹ️  custom_data column already exists');
            process.exit(0);
        } else {
            console.error('❌ Error adding custom_data column:', error);
            process.exit(1);
        }
    }
}

addCustomDataColumn(); 