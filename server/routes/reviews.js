const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Add review
router.post('/add', async(req, res) => {
    const { user_id, rating, comment } = req.body;

    try {
        await db.execute(
            'INSERT INTO platform_reviews (user_id, rating, comment) VALUES (?, ?, ?)', [user_id, rating, comment]
        );

        res.json({ message: 'Review added' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all reviews
router.get('/', async(req, res) => {
    try {
        const [rows] = await db.execute(
            'SELECT * FROM platform_reviews ORDER BY created_at DESC'
        );

        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;