const Cart = require("../models/Cart");
const Product = require("../models/Product");

exports.addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  const product = await Product.findById(productId);

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({
      userId,
      items: [],
      totalPrice: 0
    });
  }

  cart.items.push({ productId, quantity });
  cart.totalPrice += product.price * quantity;

  await cart.save();
  res.json(cart);
};