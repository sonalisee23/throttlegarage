const express = require('express');
const router = express.Router();
const db = require('../config/database');
const jwt = require('jsonwebtoken');

// Authentication middleware
const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'superbike-mods-secret-key');
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

// Get all trade listings
router.get('/listings', async (req, res) => {
    try {
        const [listings] = await db.pool.query(`
            SELECT 
                tl.*,
                u.fullName as user_name,
                u.email as user_email
            FROM trade_listings tl
            JOIN users u ON tl.user_id = u.id
            WHERE tl.status = 'Active'
            ORDER BY tl.created_at DESC
        `);
        
        res.json(listings);
    } catch (error) {
        console.error('Error fetching trade listings:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get trade listings by user
router.get('/listings/my', authenticateToken, async (req, res) => {
    try {
        const [listings] = await db.pool.query(`
            SELECT * FROM trade_listings 
            WHERE user_id = ? 
            ORDER BY created_at DESC
        `, [req.user.id]);
        
        res.json(listings);
    } catch (error) {
        console.error('Error fetching user trade listings:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get single trade listing
router.get('/listings/:id', async (req, res) => {
    try {
        const [listings] = await db.pool.query(`
            SELECT 
                tl.*,
                u.fullName as user_name,
                u.email as user_email
            FROM trade_listings tl
            JOIN users u ON tl.user_id = u.id
            WHERE tl.id = ?
        `, [req.params.id]);
        
        if (!listings.length) {
            return res.status(404).json({ message: 'Trade listing not found' });
        }
        
        res.json(listings[0]);
    } catch (error) {
        console.error('Error fetching trade listing:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Create new trade listing
router.post('/listings', authenticateToken, async (req, res) => {
    try {
        const { title, description, condition, price, trade_preference, category, images } = req.body;
        
        if (!title || !description || !condition || !price || !category) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        
        const [result] = await db.pool.query(`
            INSERT INTO trade_listings 
            (user_id, title, description, \`condition\`, price, trade_preference, category, images) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `, [req.user.id, title, description, condition, price, trade_preference, category, JSON.stringify(images || [])]);
        
        const [newListing] = await db.pool.query(`
            SELECT 
                tl.*,
                u.fullName as user_name,
                u.email as user_email
            FROM trade_listings tl
            JOIN users u ON tl.user_id = u.id
            WHERE tl.id = ?
        `, [result.insertId]);
        
        res.status(201).json(newListing[0]);
    } catch (error) {
        console.error('Error creating trade listing:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Update trade listing
router.put('/listings/:id', authenticateToken, async (req, res) => {
    try {
        const { title, description, condition, price, trade_preference, category, images, status } = req.body;
        const listingId = req.params.id;
        
        // Check if user owns the listing
        const [existing] = await db.pool.query(
            'SELECT user_id FROM trade_listings WHERE id = ?',
            [listingId]
        );
        
        if (!existing.length) {
            return res.status(404).json({ message: 'Trade listing not found' });
        }
        
        if (existing[0].user_id !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to update this listing' });
        }
        
        const updateFields = [];
        const updateValues = [];
        
        if (title !== undefined) {
            updateFields.push('title = ?');
            updateValues.push(title);
        }
        if (description !== undefined) {
            updateFields.push('description = ?');
            updateValues.push(description);
        }
        if (condition !== undefined) {
            updateFields.push('`condition` = ?');
            updateValues.push(condition);
        }
        if (price !== undefined) {
            updateFields.push('price = ?');
            updateValues.push(price);
        }
        if (trade_preference !== undefined) {
            updateFields.push('trade_preference = ?');
            updateValues.push(trade_preference);
        }
        if (category !== undefined) {
            updateFields.push('category = ?');
            updateValues.push(category);
        }
        if (images !== undefined) {
            updateFields.push('images = ?');
            updateValues.push(JSON.stringify(images));
        }
        if (status !== undefined) {
            updateFields.push('status = ?');
            updateValues.push(status);
        }
        
        if (updateFields.length === 0) {
            return res.status(400).json({ message: 'No fields to update' });
        }
        
        updateValues.push(listingId);
        
        await db.pool.query(`
            UPDATE trade_listings 
            SET ${updateFields.join(', ')}, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        `, updateValues);
        
        const [updatedListing] = await db.pool.query(`
            SELECT 
                tl.*,
                u.fullName as user_name,
                u.email as user_email
            FROM trade_listings tl
            JOIN users u ON tl.user_id = u.id
            WHERE tl.id = ?
        `, [listingId]);
        
        res.json(updatedListing[0]);
    } catch (error) {
        console.error('Error updating trade listing:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Delete trade listing
router.delete('/listings/:id', authenticateToken, async (req, res) => {
    try {
        const listingId = req.params.id;
        
        // Check if user owns the listing
        const [existing] = await db.pool.query(
            'SELECT user_id FROM trade_listings WHERE id = ?',
            [listingId]
        );
        
        if (!existing.length) {
            return res.status(404).json({ message: 'Trade listing not found' });
        }
        
        if (existing[0].user_id !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to delete this listing' });
        }
        
        await db.pool.query('DELETE FROM trade_listings WHERE id = ?', [listingId]);
        
        res.json({ message: 'Trade listing deleted successfully' });
    } catch (error) {
        console.error('Error deleting trade listing:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get messages for a listing
router.get('/listings/:id/messages', authenticateToken, async (req, res) => {
    try {
        const listingId = req.params.id;
        
        // Check if user is involved in this listing (either as owner or message participant)
        const [listing] = await db.pool.query(
            'SELECT user_id FROM trade_listings WHERE id = ?',
            [listingId]
        );
        
        if (!listing.length) {
            return res.status(404).json({ message: 'Trade listing not found' });
        }
        
        const [messages] = await db.pool.query(`
            SELECT 
                tm.*,
                sender.fullName as sender_name,
                receiver.fullName as receiver_name
            FROM trade_messages tm
            JOIN users sender ON tm.sender_id = sender.id
            JOIN users receiver ON tm.receiver_id = receiver.id
            WHERE tm.listing_id = ? 
            AND (tm.sender_id = ? OR tm.receiver_id = ? OR ? = ?)
            ORDER BY tm.created_at ASC
        `, [listingId, req.user.id, req.user.id, req.user.id, listing[0].user_id]);
        
        res.json(messages);
    } catch (error) {
        console.error('Error fetching trade messages:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Send message for a listing
router.post('/listings/:id/messages', authenticateToken, async (req, res) => {
    try {
        const { message, receiver_id } = req.body;
        const listingId = req.params.id;
        
        if (!message || !receiver_id) {
            return res.status(400).json({ message: 'Message and receiver_id are required' });
        }
        
        // Check if listing exists
        const [listing] = await db.pool.query(
            'SELECT user_id FROM trade_listings WHERE id = ?',
            [listingId]
        );
        
        if (!listing.length) {
            return res.status(404).json({ message: 'Trade listing not found' });
        }
        
        // Check if receiver exists
        const [receiver] = await db.pool.query(
            'SELECT id FROM users WHERE id = ?',
            [receiver_id]
        );
        
        if (!receiver.length) {
            return res.status(404).json({ message: 'Receiver not found' });
        }
        
        const [result] = await db.pool.query(`
            INSERT INTO trade_messages (listing_id, sender_id, receiver_id, message)
            VALUES (?, ?, ?, ?)
        `, [listingId, req.user.id, receiver_id, message]);
        
        const [newMessage] = await db.pool.query(`
            SELECT 
                tm.*,
                sender.fullName as sender_name,
                receiver.fullName as receiver_name
            FROM trade_messages tm
            JOIN users sender ON tm.sender_id = sender.id
            JOIN users receiver ON tm.receiver_id = receiver.id
            WHERE tm.id = ?
        `, [result.insertId]);
        
        res.status(201).json(newMessage[0]);
    } catch (error) {
        console.error('Error sending trade message:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get user's trade conversations
router.get('/conversations', authenticateToken, async (req, res) => {
    try {
        const [conversations] = await db.pool.query(`
            SELECT DISTINCT
                tm.listing_id,
                tl.title as listing_title,
                tl.status as listing_status,
                CASE 
                    WHEN tm.sender_id = ? THEN tm.receiver_id
                    ELSE tm.sender_id
                END as other_user_id,
                CASE 
                    WHEN tm.sender_id = ? THEN receiver.fullName
                    ELSE sender.fullName
                END as other_user_name,
                MAX(tm.created_at) as last_message_time
            FROM trade_messages tm
            JOIN trade_listings tl ON tm.listing_id = tl.id
            JOIN users sender ON tm.sender_id = sender.id
            JOIN users receiver ON tm.receiver_id = receiver.id
            WHERE tm.sender_id = ? OR tm.receiver_id = ?
            GROUP BY tm.listing_id, other_user_id
            ORDER BY last_message_time DESC
        `, [req.user.id, req.user.id, req.user.id, req.user.id]);
        
        res.json(conversations);
    } catch (error) {
        console.error('Error fetching trade conversations:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router; 