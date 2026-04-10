const express = require('express');
const router = express.Router();
const db = require('../config/database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Middleware for JWT authentication
const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
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

// Get all products
router.get('/', async (req, res) => {
    try {
        const [products] = await db.pool.query('SELECT * FROM products');
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
});

// Get single product
router.get('/:id', async (req, res) => {
    try {
        const [products] = await db.pool.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
        if (!products.length) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(products[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product', error: error.message });
    }
});

// Create product (admin only)
router.post('/', authenticateToken, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }
        const { name, description, price, category, image_url, stock } = req.body;
        const [result] = await db.pool.query(
            'INSERT INTO products (name, description, price, category, image_url, stock) VALUES (?, ?, ?, ?, ?, ?)',
            [name, description, price, category, image_url, stock || 0]
        );
        res.status(201).json({ id: result.insertId, name, description, price, category, image_url, stock: stock || 0 });
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error: error.message });
    }
});

// Update product (admin only)
router.patch('/:id', authenticateToken, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }
        const { name, description, price, category, image_url, stock } = req.body;
        const [result] = await db.pool.query(
            'UPDATE products SET name=?, description=?, price=?, category=?, image_url=?, stock=? WHERE id=?',
            [name, description, price, category, image_url, stock, req.params.id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ id: req.params.id, name, description, price, category, image_url, stock });
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
});

// Delete product (admin only)
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }
        const [result] = await db.pool.query('DELETE FROM products WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
});

module.exports = router; 