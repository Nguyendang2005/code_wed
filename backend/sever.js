require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./src/routes/auth.route");
const productRoutes = require("./src/routes/product.route");
const orderRoutes = require("./src/routes/order.route");
const dashboardRoutes = require("./src/routes/dashboard.route");

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.get("/health", (req, res) => res.json({ ok: true }));

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/dashboard", dashboardRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running on port ${port}`));
