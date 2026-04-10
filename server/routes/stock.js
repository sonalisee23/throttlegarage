const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get stock availability and delivery estimate for a product
router.get('/availability/:productId', async (req, res) => {
    try {
        const { productId } = req.params;
        const { zip_code } = req.query;

        if (!zip_code) {
            return res.status(400).json({ message: 'Zip code is required' });
        }

        // Get warehouses with available stock
        const [inventory] = await db.pool.query(`
            SELECT w.*, wi.quantity, wi.restock_eta,
                   dz.estimated_days_min, dz.estimated_days_max
            FROM warehouses w
            JOIN warehouse_inventory wi ON w.id = wi.warehouse_id
            JOIN delivery_zones dz ON w.id = dz.warehouse_id
            WHERE wi.product_id = ?
            AND wi.quantity > 0
            AND dz.zip_code_pattern LIKE CONCAT(LEFT(?, 3), '%')
            ORDER BY wi.quantity DESC
        `, [productId, zip_code]);

        if (!inventory.length) {
            // Check for upcoming restocks if no current stock
            const [restocks] = await db.pool.query(`
                SELECT MIN(wi.restock_eta) as next_restock
                FROM warehouse_inventory wi
                WHERE wi.product_id = ?
                AND wi.restock_eta IS NOT NULL
            `, [productId]);

            return res.json({
                in_stock: false,
                next_restock: restocks[0]?.next_restock || null,
                message: restocks[0]?.next_restock ? 
                    'Currently out of stock. Restock expected soon.' : 
                    'Currently out of stock. No restock date available.'
            });
        }

        // Calculate delivery estimate
        const warehouse = inventory[0];
        const today = new Date();
        const minDeliveryDate = new Date(today.setDate(today.getDate() + warehouse.estimated_days_min));
        const maxDeliveryDate = new Date(today.setDate(today.getDate() + warehouse.estimated_days_max - warehouse.estimated_days_min));

        res.json({
            in_stock: true,
            quantity_available: warehouse.quantity,
            estimated_delivery: {
                min_date: minDeliveryDate.toISOString().split('T')[0],
                max_date: maxDeliveryDate.toISOString().split('T')[0],
                min_days: warehouse.estimated_days_min,
                max_days: warehouse.estimated_days_max
            },
            warehouse: {
                name: warehouse.name,
                distance: null // To be calculated if coordinates provided
            }
        });
    } catch (error) {
        console.error('Error checking stock availability:', error);
        res.status(500).json({ message: 'Error checking stock availability' });
    }
});

// Get stock levels for multiple products
router.post('/bulk-availability', async (req, res) => {
    try {
        const { products, zip_code } = req.body;

        if (!Array.isArray(products) || !zip_code) {
            return res.status(400).json({ message: 'Products array and zip code are required' });
        }

        const results = {};
        for (const productId of products) {
            const [inventory] = await db.pool.query(`
                SELECT wi.quantity, wi.restock_eta,
                       dz.estimated_days_min, dz.estimated_days_max
                FROM warehouse_inventory wi
                JOIN warehouses w ON w.id = wi.warehouse_id
                JOIN delivery_zones dz ON w.id = dz.warehouse_id
                WHERE wi.product_id = ?
                AND wi.quantity > 0
                AND dz.zip_code_pattern LIKE CONCAT(LEFT(?, 3), '%')
                ORDER BY wi.quantity DESC
                LIMIT 1
            `, [productId, zip_code]);

            results[productId] = inventory[0] ? {
                in_stock: true,
                quantity: inventory[0].quantity,
                estimated_delivery_days: {
                    min: inventory[0].estimated_days_min,
                    max: inventory[0].estimated_days_max
                }
            } : {
                in_stock: false,
                next_restock: null
            };
        }

        res.json(results);
    } catch (error) {
        console.error('Error checking bulk stock availability:', error);
        res.status(500).json({ message: 'Error checking bulk stock availability' });
    }
});

module.exports = router; 