const jwt = require('jsonwebtoken');
const db = require('../config/database');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const [rows] = await db.pool.query('SELECT id, email, fullName, role FROM users WHERE id = ?', [decoded.id]);
        
        if (!rows.length) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        req.user = rows[0];
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
};

module.exports = {
    authenticateToken
}; 