const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Submit contact message
router.post('/submit', async (req, res) => {
    try {
        console.log('Received contact form submission:', req.body);

        const { name, email, subject, message } = req.body;

        // Validate input
        if (!name || !email || !subject || !message) {
            console.log('Missing required fields:', { name, email, subject, message });
            return res.status(400).json({ 
                success: false, 
                message: 'All fields are required' 
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            console.log('Invalid email format:', email);
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid email format' 
            });
        }

        console.log('Attempting to insert into database...');

        // Insert into database
        const [result] = await db.pool.query(
            'INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)',
            [name, email, subject, message]
        );

        console.log('Successfully inserted into database:', result);

        res.status(201).json({
            success: true,
            message: 'Message sent successfully',
            messageId: result.insertId
        });

    } catch (error) {
        console.error('Detailed error in contact submission:', {
            message: error.message,
            stack: error.stack,
            code: error.code,
            sqlMessage: error.sqlMessage
        });
        
        // Send a more informative error message
        res.status(500).json({ 
            success: false, 
            message: 'Failed to send message: ' + (error.sqlMessage || error.message),
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// Get all contact messages (admin only)
router.get('/messages', async (req, res) => {
    try {
        // TODO: Add authentication middleware to protect this route
        const [messages] = await db.pool.query(
            'SELECT * FROM contact_messages ORDER BY created_at DESC'
        );
        
        res.json({
            success: true,
            messages
        });

    } catch (error) {
        console.error('Error fetching contact messages:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to fetch messages',
            error: error.message 
        });
    }
});

module.exports = router; 