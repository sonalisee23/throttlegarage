const db = require('./config/database');

async function checkTables() {
    try {
        const [rows] = await db.pool.query('SHOW TABLES');
        console.log('Database tables:');
        rows.forEach(r => console.log(Object.values(r)[0]));
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

checkTables(); 