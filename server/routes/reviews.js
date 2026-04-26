const express = require('express');
const router = express.Router();
const db = require('../config/database');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'superbike-mods-secret-key';

const authenticateToken = async(req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        const [rows] = await db.pool.query(
            'SELECT id, fullName, email FROM users WHERE id = ?', [decoded.id]
        );

        if (!rows.length) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        req.user = rows[0];
        next();
    } catch (err) {
        res.status(403).json({ message: 'Invalid token' });
    }
};

router.get('/test', (req, res) => {
    res.send('Reviews route working');
});

router.post('/', authenticateToken, async(req, res) => {
    try {
        const { rating, review_text } = req.body;

        if (!rating || !review_text) {
            return res.status(400).json({ message: 'Rating and review are required' });
        }

        await db.pool.query(
            `INSERT INTO user_reviews (user_id, user_name, rating, review_text)
             VALUES (?, ?, ?, ?)`, [req.user.id, req.user.fullName, rating, review_text]
        );

        res.json({ message: 'Review submitted successfully' });

    } catch (err) {
        console.error('Review submit error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get recent reviews for About page
router.get('/', async(req, res) => {
    try {
        const [rows] = await db.pool.query(`
            SELECT 
                id,
                user_id,
                user_name,
                rating,
                review_text,
                created_at
            FROM user_reviews
            WHERE status = 'active'
            ORDER BY created_at DESC
            LIMIT 10
        `);

        res.json(rows);
    } catch (err) {
        console.error('Fetch reviews error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;