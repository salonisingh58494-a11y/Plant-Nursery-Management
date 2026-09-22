import React from "react";
import { useCart } from "../../context/CartContext";

const SHIPPING_COST = 5.0;
const TAX_RATE = 0.05;

const CartTotalSummary = ({ onProceed }) => {
  const { cartItems, getTotalAmount } = useCart();

  const subtotal =
    typeof getTotalAmount === "function" ? getTotalAmount() : 0;

  const tax = subtotal * TAX_RATE;
  const total = subtotal + SHIPPING_COST + tax;

  return (
    <div style={summaryStyles.container}>
      <h2 style={summaryStyles.header}>Order Summary</h2>

      <div style={summaryStyles.row}>
        <span>Subtotal ({cartItems.length} items)</span>
        <span>₹{subtotal.toFixed(2)}</span>
      </div>

      <div style={summaryStyles.row}>
        <span>Shipping</span>
        <span>₹{SHIPPING_COST.toFixed(2)}</span>
      </div>

      <div style={summaryStyles.row}>
        <span>Estimated Tax (5%)</span>
        <span>₹{tax.toFixed(2)}</span>
      </div>

      <div style={{ ...summaryStyles.row, ...summaryStyles.totalRow }}>
        <h3>Order Total</h3>
        <h3>₹{total.toFixed(2)}</h3>
      </div>

      <button
        type="button"
        onClick={onProceed}   // ✅ FIXED
        style={summaryStyles.checkoutButton}
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

const summaryStyles = {
  container: {
    backgroundColor: "#f9f9f9",
    padding: "25px",
    borderRadius: "10px",
    border: "1px solid #eee",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  },
  header: {
    fontSize: "1.5em",
    borderBottom: "2px solid #ddd",
    paddingBottom: "10px",
    marginBottom: "15px",
    color: "#1e3a5f",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 0",
    fontSize: "1em",
    color: "#4a5568",
  },
  totalRow: {
    borderTop: "2px dashed #ddd",
    marginTop: "15px",
    paddingTop: "15px",
    fontSize: "1.2em",
    color: "#00b894",
  },
  checkoutButton: {
    width: "100%",
    padding: "12px",
    marginTop: "20px",
    backgroundColor: "#ff6f61",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1.1em",
    fontWeight: "bold",
  },
};

export default CartTotalSummary;
