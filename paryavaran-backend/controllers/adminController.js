const User = require('../models/userModel'); 
const Product = require('../models/Product'); 
const Order = require('../models/Order');
exports.getAdminStats = async (req, res) => {
  try {
    const [totalUsers, totalProducts, totalOrders] = await Promise.all([
      User.countDocuments(),
      Product.countDocuments(),
      Order.countDocuments(),
    ]);
    const salesData = await Order.aggregate([
      { 
        $group: { 
          _id: null, 
          total: { $sum: "$totalPrice" } 
        } 
      }
    ]);
    const totalSales = salesData.length > 0 ? salesData[0].total : 0;

    res.status(200).json({ 
      success: true,
      stats: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalSales
      }
    });
  } catch (error) {
    console.error("Stats Error:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password").sort({ createdAt: -1 });
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Users fetch karne mein galti hui", error: error.message });
  }
};