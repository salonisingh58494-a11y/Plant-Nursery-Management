import React from "react";
import { useCart } from "../../context/CartContext";

export default function CartItem({ item }) {
  const { removeFromCart, updateQuantity } = useCart();

  // Price agar string mein aaye toh use number mein convert karke format karega
  const formatCurrency = (amount) => {
    const value = Number(amount) || 0;
    return `₹ ${value.toFixed(2)}`;
  };

  const handleQuantityChange = (e) => {
    let newQuantity = parseInt(e.target.value, 10);
    if (isNaN(newQuantity) || newQuantity < 1) {
      newQuantity = 1;
    }
    updateQuantity(item.id, newQuantity);
  };

  return (
    <div className="cart-item">
      {/* Left Section: Image + Info */}
      <div className="cart-item-left">
        {/* 💡 FIXED: item.image ki jagah item.img1 use kiya kyunki Plants.jsx mein img1 hai */}
        <img 
          src={item.img1} 
          alt={item.name} 
          onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=No+Image'; }} 
        />
        
        <div className="cart-item-details">
          <span className="item-name">{item.name}</span>
          <span className="item-price">
            {formatCurrency(item.price)} per item
          </span>
          <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
            Remove
          </button>
        </div>
      </div>

      {/* Right Section: Quantity + Total */}
      <div className="cart-item-right">
        <div className="quantity-wrapper">
          <span>Quantity:</span>
          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={handleQuantityChange}
          />
        </div>
        <div className="total-price">
          Total: {formatCurrency(item.price * item.quantity)}
        </div>
      </div>
    </div>
  );
}