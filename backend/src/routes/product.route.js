const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const productController = require("../controllers/product.controller");

router.get("/", auth, productController.list);
router.post("/", auth, productController.create);

module.exports = router;
