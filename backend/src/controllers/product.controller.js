const pool = require("../config/database");

exports.list = async (req, res) => {
  const pharmacyId = req.user.pharmacy_id;
  const [rows] = await pool.query(
    "SELECT id, sku, name, category, unit, storage, default_min_stock, status, created_at FROM products WHERE pharmacy_id=? ORDER BY id DESC",
    [pharmacyId],
  );
  res.json(rows);
};

exports.create = async (req, res) => {
  const pharmacyId = req.user.pharmacy_id;
  const { sku, name, category, unit, storage, default_min_stock } =
    req.body || {};
  if (!name) return res.status(400).json({ message: "Missing name" });

  const [result] = await pool.query(
    "INSERT INTO products (pharmacy_id, sku, name, category, unit, storage, default_min_stock) VALUES (?,?,?,?,?,?,?)",
    [
      pharmacyId,
      sku || null,
      name,
      category || null,
      unit || null,
      storage || null,
      default_min_stock ?? 10,
    ],
  );
  res.json({ id: result.insertId });
};
