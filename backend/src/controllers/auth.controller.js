const pool = require("../config/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password)
    return res.status(400).json({ message: "Missing email/password" });

  const [rows] = await pool.query(
    "SELECT id,email,password,role,pharmacy_id,name,status FROM users WHERE email=? LIMIT 1",
    [email],
  );
  const user = rows[0];
  if (!user)
    return res.status(401).json({ message: "Email hoặc mật khẩu sai" });
  if (user.status !== "active")
    return res.status(403).json({ message: "Tài khoản bị khóa" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ message: "Email hoặc mật khẩu sai" });

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      pharmacy_id: user.pharmacy_id,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" },
  );

  await pool.query("UPDATE users SET last_login=NOW() WHERE id=?", [user.id]);

  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      pharmacy_id: user.pharmacy_id,
      name: user.name,
    },
  });
};

exports.me = async (req, res) => {
  const id = req.user.id;
  const [rows] = await pool.query(
    "SELECT id,email,role,pharmacy_id,name,status,last_login,created_at FROM users WHERE id=? LIMIT 1",
    [id],
  );
  if (!rows[0]) return res.status(404).json({ message: "Not found" });
  res.json(rows[0]);
};
