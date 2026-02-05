const pool = require("../config/database");

exports.summary = async (req, res) => {
  const pid = req.user.pharmacy_id;

  const [[rev]] = await pool.query(
    "SELECT COALESCE(SUM(total),0) AS revenue_today FROM orders WHERE pharmacy_id=? AND status='completed' AND order_date=CURDATE()",
    [pid],
  );

  const [[orders]] = await pool.query(
    "SELECT COUNT(*) AS orders_today FROM orders WHERE pharmacy_id=? AND order_date=CURDATE()",
    [pid],
  );

  res.json({
    revenue_today: Number(rev.revenue_today || 0),
    orders_today: Number(orders.orders_today || 0),
  });
};

exports.revenue7days = async (req, res) => {
  const pid = req.user.pharmacy_id;
  const [rows] = await pool.query(
    `SELECT order_date, COALESCE(SUM(total),0) AS revenue
     FROM orders
     WHERE pharmacy_id=? AND status='completed'
       AND order_date >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)
     GROUP BY order_date
     ORDER BY order_date ASC`,
    [pid],
  );
  res.json(rows);
};

exports.expiryAlerts = async (req, res) => {
  const pid = req.user.pharmacy_id;
  const days = Number(req.query.days || 30);

  const [rows] = await pool.query(
    `SELECT p.name AS product, b.batch_code, b.expiry_date,
            (b.qty_in - b.qty_out) AS stock
     FROM batches b
     JOIN products p ON p.id = b.product_id
     WHERE b.pharmacy_id=?
       AND b.expiry_date <= DATE_ADD(CURDATE(), INTERVAL ? DAY)
       AND (b.qty_in - b.qty_out) > 0
     ORDER BY b.expiry_date ASC`,
    [pid, days],
  );
  res.json(rows);
};

exports.lowStock = async (req, res) => {
  const pid = req.user.pharmacy_id;

  const [rows] = await pool.query(
    `SELECT p.id, p.name,
            COALESCE(SUM(b.qty_in - b.qty_out),0) AS stock,
            p.default_min_stock AS min_stock
     FROM products p
     LEFT JOIN batches b ON b.product_id=p.id AND b.pharmacy_id=p.pharmacy_id
     WHERE p.pharmacy_id=?
     GROUP BY p.id, p.name, p.default_min_stock
     HAVING stock < min_stock
     ORDER BY stock ASC`,
    [pid],
  );

  res.json(rows);
};
