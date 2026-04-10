const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get user's orders
// oi.custom_data, -> 20th line
router.get('/', async(req, res) => {
    try {
        const userId = req.user.id; // From auth middleware
        const [orders] = await db.pool.query(
            `SELECT 
                o.id as order_id,
                o.status as order_status,
                o.total_amount,
                o.created_at as order_created_at,
                o.shipping_address,
                oi.id as order_item_id,
                oi.product_id,
                oi.quantity,
                oi.price,
                p.name as product_name,
                p.image_url
             FROM orders o
             JOIN order_items oi ON o.id = oi.order_id
             LEFT JOIN products p ON oi.product_id = p.id
             WHERE o.user_id = ?
             ORDER BY o.created_at DESC`, [userId]
        );

        // Group order items by order
        const groupedOrders = orders.reduce((acc, item) => {
            if (!acc[item.order_id]) {
                acc[item.order_id] = {
                    id: item.order_id,
                    status: item.order_status,
                    total_amount: item.total_amount,
                    created_at: item.order_created_at,
                    shipping_address: typeof item.shipping_address === 'string' ?
                        JSON.parse(item.shipping_address) : item.shipping_address,
                    items: []
                };
            }
            // Handle both database products and local products
            let productInfo = {};
            if (item.product_id === -999 && item.custom_data) {
                let localData = item.custom_data;
                if (typeof localData === 'string') {
                    try {
                        localData = JSON.parse(localData);
                    } catch (e) {
                        localData = {};
                    }
                }
                productInfo = {
                    product_name: localData.name,
                    image_url: localData.image,
                    local_product_id: localData.local_product_id
                };
            } else {
                productInfo = {
                    product_name: item.product_name,
                    image_url: item.image_url
                };
            }
            acc[item.order_id].items.push({
                ...productInfo,
                product_id: item.product_id,
                quantity: item.quantity,
                price: item.price
            });
            return acc;
        }, {});

        res.json(Object.values(groupedOrders));
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
});

// Create return request
router.post('/return', async(req, res) => {
    const connection = await db.pool.getConnection();
    try {
        await connection.beginTransaction();

        const { orderId, items, reason } = req.body;
        const userId = req.user.id;

        // Verify order belongs to user
        const [orderCheck] = await connection.query(
            'SELECT * FROM orders WHERE id = ? AND user_id = ?', [orderId, userId]
        );

        if (!orderCheck.length) {
            throw new Error('Order not found or does not belong to user');
        }

        // Create return request
        const [result] = await connection.query(
            `INSERT INTO returns (order_id, user_id, reason, status) 
             VALUES (?, ?, ?, 'pending')`, [orderId, userId, reason]
        );

        const returnId = result.insertId;

        // Add return items
        for (const item of items) {
            const productId = item.productId || item.id;

            // Check if this is a string ID (bike part) or integer ID (database product)
            if (typeof productId === 'string') {
                // For string IDs, store in custom_data with special product_id
                const localProductData = {
                    local_product_id: productId,
                    name: item.name,
                    image: item.image,
                    description: item.description
                };

                await connection.query(
                    `INSERT INTO return_items (return_id, product_id, quantity, reason, custom_data) 
                     VALUES (?, ?, ?, ?, ?)`, [returnId, -999, item.quantity, item.reason, JSON.stringify(localProductData)]
                );
            } else {
                // For integer IDs, verify product exists and store normally
                const [productCheck] = await connection.query(
                    'SELECT id FROM products WHERE id = ?', [productId]
                );

                if (productCheck.length === 0) {
                    throw new Error(`Product with ID ${productId} not found in database`);
                }

                await connection.query(
                    `INSERT INTO return_items (return_id, product_id, quantity, reason) 
                     VALUES (?, ?, ?, ?)`, [returnId, productId, item.quantity, item.reason]
                );
            }
        }

        // Update order status
        await connection.query(
            'UPDATE orders SET status = ? WHERE id = ?', ['return_requested', orderId]
        );

        await connection.commit();
        res.status(201).json({
            success: true,
            message: 'Return request created successfully',
            returnId
        });

    } catch (error) {
        await connection.rollback();
        console.error('Error creating return request:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create return request',
            error: error.message
        });
    } finally {
        connection.release();
    }
});

// Get user's returns
router.get('/returns', async(req, res) => {
    try {
        const userId = req.user.id;
        const [returns] = await db.pool.query(
            `SELECT r.*, o.total_amount, ri.*, p.name as product_name, p.image_url, ri.custom_data
             FROM returns r
             JOIN orders o ON r.order_id = o.id
             JOIN return_items ri ON r.id = ri.return_id
             LEFT JOIN products p ON ri.product_id = p.id
             WHERE r.user_id = ?
             ORDER BY r.created_at DESC`, [userId]
        );

        // Group return items by return request
        const groupedReturns = returns.reduce((acc, item) => {
            if (!acc[item.return_id]) {
                acc[item.return_id] = {
                    id: item.return_id,
                    orderId: item.order_id,
                    status: item.status,
                    reason: item.reason,
                    created_at: item.created_at,
                    items: []
                };
            }

            // Handle both database products and local products
            let productInfo = {};

            if (item.product_id === -999 && item.custom_data) {
                let localData = item.custom_data;
                if (typeof localData === 'string') {
                    try {
                        localData = JSON.parse(localData);
                    } catch (e) {
                        localData = {};
                    }
                }
                productInfo = {
                    product_name: localData.name,
                    image_url: localData.image,
                    local_product_id: localData.local_product_id
                };
            } else {
                productInfo = {
                    product_name: item.product_name,
                    image_url: item.image_url
                };
            }

            acc[item.return_id].items.push({
                ...productInfo,
                quantity: item.quantity,
                reason: item.reason
            });
            return acc;
        }, {});

        res.json(Object.values(groupedReturns));
    } catch (error) {
        console.error('Error fetching returns:', error);
        res.status(500).json({ message: 'Error fetching returns', error: error.message });
    }
});

// Place a new order
router.post('/', async(req, res) => {
    try {
        const userId = req.user && req.user.id;
        // Accept both camelCase and snake_case keys
        const items = req.body.items;
        const total_amount = req.body.total_amount || req.body.totalAmount;
        const payment_method = req.body.payment_method || req.body.paymentMethod;
        const shipping_address = req.body.shipping_address || req.body.shippingAddress;

        if (!userId) {
            return res.status(401).json({ success: false, message: 'Authentication required.' });
        }
        if (!items || !total_amount || !payment_method || !shipping_address) {
            return res.status(400).json({ success: false, message: 'Missing required order fields.' });
        }

        // Insert order
        const [orderResult] = await db.pool.query(
            `INSERT INTO orders (user_id, total_amount, status, payment_status, payment_method, shipping_address) VALUES (?, ?, 'pending', 'pending', ?, ?)`, [userId, total_amount, payment_method, JSON.stringify(shipping_address)]
        );
        const orderId = orderResult.insertId;

        // Insert order items
        for (const item of items) {
            const productId = item.id || item.productId;
            let isLocalProduct = false;
            let localProductData = null;

            if (typeof productId === 'string') {
                isLocalProduct = true;
                localProductData = {
                    local_product_id: productId,
                    name: item.name,
                    image: item.image,
                    description: item.description
                };
            } else if (Number.isInteger(productId)) {
                // For integer IDs, check if product exists in DB
                const [productCheck] = await db.pool.query(
                    'SELECT * FROM products WHERE id = ?', [productId]
                );
                if (productCheck.length === 0) {
                    isLocalProduct = true;
                    localProductData = {
                        local_product_id: productId,
                        name: item.name,
                        image: item.image,
                        description: item.description
                    };
                }
            } else {
                return res.status(400).json({
                    success: false,
                    message: `Invalid product_id: ${productId}. Product IDs must be integers or valid strings.`
                });
            }

            if (isLocalProduct) {
                await db.pool.query(
                    `INSERT INTO order_items (order_id, product_id, quantity, price, custom_data) VALUES (?, ?, ?, ?, ?)`, [orderId, -999, item.quantity, item.price, JSON.stringify(localProductData)]
                );
            } else {
                await db.pool.query(
                    `INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)`, [orderId, productId, item.quantity, item.price]
                );
            }
        }

        // Return success response
        return res.status(201).json({
            success: true,
            message: 'Order placed successfully',
            orderId: orderId
        });

    } catch (error) {
        console.error('Error placing order:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to place order',
            error: error.message
        });
    }
});

module.exports = router;