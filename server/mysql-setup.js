const mysql = require('mysql2/promise');

async function testMySQLConnection() {
    // Try different password combinations
    const configs = [
        { password: '' },        // Empty password
        { password: 'root' },    // Common default password
        { password: 'password' } // Another common password
    ];

    for (const config of configs) {
        try {
            const connection = await mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: config.password,
                port: 3306
            });

            console.log(`Successfully connected with password: "${config.password}"`);
            
            // Try to set new password
            try {
                await connection.execute(`ALTER USER 'root'@'localhost' IDENTIFIED BY 'root'`);
                console.log('Successfully set new password to "root"');
            } catch (alterError) {
                console.error('Could not set new password:', alterError.message);
            }

            await connection.end();
            return true;
        } catch (error) {
            console.log(`Failed to connect with password: "${config.password}"`);
            console.log('Error:', error.message);
        }
    }
    
    console.log('\nAll connection attempts failed.');
    console.log('Please try these steps:');
    console.log('1. Open MySQL Command Line Client as administrator');
    console.log('2. When it asks for password, try:');
    console.log('   - Press Enter (empty password)');
    console.log('   - Type "root"');
    console.log('   - Type "password"');
    console.log('3. If none work, you may need to reset the MySQL root password');
    
    return false;
}

testMySQLConnection().catch(console.error); 