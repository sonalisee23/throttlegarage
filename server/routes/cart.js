const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');

// Authentication middleware
const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }
        const jwt = require('jsonwebtoken');
        const JWT_SECRET = process.env.JWT_SECRET || 'superbike-mods-secret-key';
        const decoded = jwt.verify(token, JWT_SECRET);
        const [rows] = await pool.query('SELECT id, email, fullName, role FROM users WHERE id = ?', [decoded.id]);
        if (!rows.length) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = rows[0];
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
};

/*
// Get user's cart
router.get('/', authenticateToken, async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT c.*, p.name, p.price, p.image FROM cart c JOIN products p ON c.product_id = p.id WHERE c.user_id = ?',
            [req.user.id]
        );
        
        const cart = rows.map(item => ({
            product_id: item.product_id,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: item.quantity
        }));
        
        res.json({ success: true, cart });
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ success: false, message: 'Error fetching cart' });
    }
});

// Sync cart with server
router.post('/sync', authenticateToken, async (req, res) => {
    try {
        const { localCart } = req.body;
        
        // Clear existing cart for this user
        await pool.query('DELETE FROM cart WHERE user_id = ?', [req.user.id]);
        
        // Add new items to cart
        if (localCart && localCart.length > 0) {
            for (const item of localCart) {
                await pool.query(
                    'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)',
                    [req.user.id, item.id, item.quantity]
                );
            }
        }
        
        // Return updated cart
        const [rows] = await pool.query(
            'SELECT c.*, p.name, p.price, p.image FROM cart c JOIN products p ON c.product_id = p.id WHERE c.user_id = ?',
            [req.user.id]
        );
        
        const cart = rows.map(item => ({
            product_id: item.product_id,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: item.quantity
        }));
        
        res.json({ success: true, cart });
    } catch (error) {
        console.error('Error syncing cart:', error);
        res.status(500).json({ success: false, message: 'Error syncing cart' });
    }
});

// Update cart item quantity
router.put('/update/:productId', authenticateToken, async (req, res) => {
    try {
        const { productId } = req.params;
        const { quantity } = req.body;
        
        if (quantity <= 0) {
            // Remove item if quantity is 0 or less
            await pool.query(
                'DELETE FROM cart WHERE user_id = ? AND product_id = ?',
                [req.user.id, productId]
            );
        } else {
            // Update quantity
            await pool.query(
                'UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?',
                [quantity, req.user.id, productId]
            );
        }
        
        // Return updated cart
        const [rows] = await pool.query(
            'SELECT c.*, p.name, p.price, p.image FROM cart c JOIN products p ON c.product_id = p.id WHERE c.user_id = ?',
            [req.user.id]
        );
        
        const cart = rows.map(item => ({
            product_id: item.product_id,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: item.quantity
        }));
        
        res.json({ success: true, cart });
    } catch (error) {
        console.error('Error updating cart:', error);
        res.status(500).json({ success: false, message: 'Error updating cart' });
    }
});

// Remove item from cart
router.delete('/remove/:productId', authenticateToken, async (req, res) => {
    try {
        const { productId } = req.params;
        
        await pool.query(
            'DELETE FROM cart WHERE user_id = ? AND product_id = ?',
            [req.user.id, productId]
        );
        
        // Return updated cart
        const [rows] = await pool.query(
            'SELECT c.*, p.name, p.price, p.image FROM cart c JOIN products p ON c.product_id = p.id WHERE c.user_id = ?',
            [req.user.id]
        );
        
        const cart = rows.map(item => ({
            product_id: item.product_id,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: item.quantity
        }));
        
        res.json({ success: true, cart });
    } catch (error) {
        console.error('Error removing from cart:', error);
        res.status(500).json({ success: false, message: 'Error removing from cart' });
    }
});

// Clear cart
router.delete('/clear', authenticateToken, async (req, res) => {
    try {
        await pool.query('DELETE FROM cart WHERE user_id = ?', [req.user.id]);
        res.json({ success: true, cart: [] });
    } catch (error) {
        console.error('Error clearing cart:', error);
        res.status(500).json({ success: false, message: 'Error clearing cart' });
    }
});
*/

module.exports = router; 