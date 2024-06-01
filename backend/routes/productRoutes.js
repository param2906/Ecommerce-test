const express = require("express");
const productController = require("../controller/productController");
const router = express.Router();

router.post("", productController.createProduct);
router.get("", productController.getProducts);
router.get("/:id", productController.getProductById);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
