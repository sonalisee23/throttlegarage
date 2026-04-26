const db = require('../config/database');

const getAllReturns = async(callback) => {
    try {
        const [rows] = await db.pool.query(`
            SELECT 
                r.id,
                r.order_id,
                r.user_id,
                r.reason,
                r.status,
                r.created_at,
                ri.product_id,
                ri.quantity,
                p.name AS product_name,
                o.id AS order_number
            FROM returns r
            LEFT JOIN return_items ri ON r.id = ri.return_id
            LEFT JOIN products p ON ri.product_id = p.id
            LEFT JOIN orders o ON r.order_id = o.id
            ORDER BY r.id DESC
        `);

        callback(null, rows);
    } catch (err) {
        console.log("DB ERROR:", err);
        callback(err, null);
    }
};

const updateReturnStatus = async(id, status, callback) => {
    try {
        await db.pool.query(
            "UPDATE returns SET status=? WHERE id=?", [status, id]
        );

        callback(null);
    } catch (err) {
        callback(err);
    }
};

module.exports = {
    getAllReturns,
    updateReturnStatus
};