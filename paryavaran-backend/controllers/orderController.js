const Order = require("../models/Order");
const mongoose = require("mongoose");

exports.checkout = async (req, res) => {
  try {
    const { userId, products, totalAmount, shippingAddress, paymentMethod } = req.body;

    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order failed: Your cart is empty."
      });
    }

    const newOrder = new Order({
      userId: userId,
      products: products.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        name: item.name, 
        price: item.price, 
        image: item.image
      })),
      totalAmount: totalAmount,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod || "COD",
      status: "Processing"
    });
    const savedOrder = await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully! 🎉",
      orderId: savedOrder._id
    });

  } catch (error) {
    console.error("CRITICAL BACKEND ERROR:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error during checkout",
      error: error.message
    });
  }
};