const db = require('./config/database');

async function checkProducts() {
    try {
        const [rows] = await db.pool.query('SELECT id, name, price FROM products LIMIT 10');
        console.log('Products in database:');
        rows.forEach(p => console.log(`ID: ${p.id}, Name: ${p.name}, Price: ${p.price}`));
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

checkProducts(); 