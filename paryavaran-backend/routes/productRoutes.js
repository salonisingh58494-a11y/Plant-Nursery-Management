const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");
router.get("/all", getProducts); 
router.get("/:id", getProductById);
router.post("/add", createProduct); 
router.put("/:id", protect, updateProduct);
router.delete("/:id", protect, deleteProduct);

module.exports = router;