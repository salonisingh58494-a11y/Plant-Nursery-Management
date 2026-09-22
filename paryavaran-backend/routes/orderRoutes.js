const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const { protect } = require("../middleware/authMiddleware");
const { checkout } = require("../controllers/orderController");

router.delete("/clear-history", protect, async (req, res) => {
  try {
    await Order.deleteMany({ userId: req.user._id });
    res.status(200).json({ success: true, message: "History cleared" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});
router.post("/", protect, checkout); 
router.get("/myorders", protect, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id })
      .populate("products.productId") 
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

module.exports = router;