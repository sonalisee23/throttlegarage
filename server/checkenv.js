console.log('Environment Check:');
console.log('=================');

// Check if .env file exists
const fs = require('fs');
try {
    if (fs.existsSync('./.env')) {
        console.log('✅ .env file found');
    } else {
        console.log('❌ .env file not found. Creating one...');
        const envContent = `PORT=5001
MONGODB_URI=mongodb://localhost:27017/superbike-mods
JWT_SECRET=superbike-mods-secret-key-change-in-production
NODE_ENV=development`;
        fs.writeFileSync('./.env', envContent);
        console.log('✅ .env file created');
    }
} catch (err) {
    console.error('Error checking .env file:', err);
}

// Check for required node modules
const requiredModules = [
    'express', 
    'mongoose', 
    'cors', 
    'dotenv', 
    'bcryptjs', 
    'jsonwebtoken'
];

console.log('\nChecking required modules:');
for (const module of requiredModules) {
    try {
        require.resolve(module);
        console.log(`✅ ${module} is installed`);
    } catch (e) {
        console.log(`❌ ${module} is not installed`);
    }
}

console.log('\nPlease run "npm install" to install missing dependencies.'); 