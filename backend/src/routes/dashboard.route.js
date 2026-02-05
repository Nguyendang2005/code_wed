const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const dashboard = require("../controllers/dashboard.controller");

router.get("/summary", auth, dashboard.summary);
router.get("/revenue-7days", auth, dashboard.revenue7days);
router.get("/expiry-alerts", auth, dashboard.expiryAlerts);
router.get("/low-stock", auth, dashboard.lowStock);

module.exports = router;
