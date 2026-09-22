import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; 
import CartItem from '../components/Cart/CartItem';
import CartTotalSummary from '../components/Cart/CartTotalSummary';
import './CartPage.css';

export default function CartPage() {
    const { cartItems } = useCart();
    const navigate = useNavigate();

    const handleProceedToCheckout = () => {
        if (cartItems.length > 0) {
            navigate('/checkout'); 
        } else {
            alert("Your cart is empty! Please add items to proceed.");
        }
    };

    return (
        <div className="cart-page-wrapper">
            <div className="cart-header-section">
                <h1>🛒 Your Shopping Cart</h1>
                <p>You have {cartItems.length} items in your bag</p>
            </div>

            {cartItems.length === 0 ? (
                <div className="empty-cart-message">
                    <p>Your cart is empty!</p>
                    <Link to="/plants" className="shop-now-btn">Continue Shopping</Link>
                </div>
            ) : (
                <div className="cart-content-layout">
                    <div className="cart-items-list">
                        {cartItems.map(item => (
                            <CartItem key={item.id} item={item} />
                        ))}
                    </div>
                    <div className="cart-summary-sidebar">
                        <CartTotalSummary onProceed={handleProceedToCheckout} />
                    </div>
                </div>
            )}
        </div>
    );
}