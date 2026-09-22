import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import ProductSummary from "../components/Checkout/ProductSummary.jsx";
import PaymentForm from "../components/Checkout/PaymentForm.jsx";
import './Checkout.css';

const SHIPPING_COST = 5.00;
const TAX_RATE = 0.05;

const Checkout = () => {
    const cartContext = useCart();
    const { cartItems = [], getTotalAmount, clearCart } = cartContext || {};
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    const [shippingData, setShippingData] = useState({
        email: "",
        fullName: "",
        address: "123 Green Street",
        city: "Delhi",
        zip: "110001",
        country: "India"
    });
    const subtotal = typeof getTotalAmount === 'function' ? getTotalAmount() : 0;
    const tax = subtotal * TAX_RATE;
    const total = subtotal + SHIPPING_COST + tax;
    useEffect(() => {
        if (!loading) {
            const token = localStorage.getItem("token");
            if (!user && !token) {
                navigate("/login", { state: { fromCheckout: true } });
            }
        }
    }, [user, loading, navigate]);
    useEffect(() => {
        if (user) {
            setShippingData(prev => ({
                ...prev,
                email: user.email || prev.email,
                fullName: user.name || user.fullName || prev.fullName
            }));
        }
    }, [user]);

    const handleChange = (e) => {
        setShippingData({ ...shippingData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        const storedUser = JSON.parse(localStorage.getItem("userInfo") || "{}");
        const currentUserId = user?.id || user?._id || storedUser.id || storedUser._id;

        if (!token || !currentUserId) {
            alert("Session expired. Please login again.");
            navigate("/login");
            return;
        }

        if (cartItems.length === 0) {
            alert("Your cart is empty!");
            navigate("/plants");
            return;
        }

        try {
            const orderPayload = {
                userId: currentUserId,
                products: cartItems.map(item => ({
                    productId: item.id || item._id,
                    quantity: Number(item.quantity),
                    name: item.name,
                    price: Number(item.price),
                    image: item.img1 || item.image || "/plants/placeholder.jpg"
                })),
                totalAmount: Number(total.toFixed(2)),
                shippingAddress: `${shippingData.fullName}, ${shippingData.address}, ${shippingData.city}, ${shippingData.zip}, ${shippingData.country}`,
                paymentMethod: "COD"
            };

            const response = await axios.post(
                "http://localhost:5000/api/orders",
                orderPayload,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.status === 201 || response.data.success) {
                alert("Order Placed Successfully 🎉");
                if (typeof clearCart === 'function') clearCart();
                navigate("/order-success", { replace: true });
            }

        } catch (error) {
            console.error("Checkout Error:", error.response?.data || error.message);
            alert(error.response?.data?.message || "Order creation failed ❌");
        }
    };

    if (loading) return <div className="spinner-container"><div className="spinner"></div><p>Verifying Session...</p></div>;

    return (
        <div className="orders-page-wrapper">
            <form className="checkout-grid" onSubmit={handleSubmit}>
                <div className="checkout-form-area">
                    <section style={styles.section}>
                        <h2 style={styles.heading}>🚚 Shipping Information</h2>

                        <div style={{ marginBottom: '15px' }}>
                            <label style={styles.label}>Email Address</label>
                            <input type="email" name="email" value={shippingData.email} onChange={handleChange} required style={styles.input} />
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <label style={styles.label}>Full Name</label>
                            <input type="text" name="fullName" value={shippingData.fullName} onChange={handleChange} required style={styles.input} />
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <label style={styles.label}>Delivery Address</label>
                            <input type="text" name="address" value={shippingData.address} onChange={handleChange} required style={styles.input} />
                        </div>

                        <div style={styles.split}>
                            <div style={{ flex: 1 }}>
                                <label style={styles.label}>City</label>
                                <input type="text" name="city" value={shippingData.city} onChange={handleChange} required style={styles.input} />
                            </div>
                            <div style={{ flex: 1, marginLeft: '10px' }}>
                                <label style={styles.label}>Zip Code</label>
                                <input type="text" name="zip" value={shippingData.zip} onChange={handleChange} required style={styles.input} />
                            </div>
                        </div>
                    </section>

                    <div style={styles.section}>
                        <PaymentForm />
                    </div>

                    <button type="submit" className="complete-btn" style={styles.submitBtn}>
                        Complete Purchase (₹{total.toFixed(2)})
                    </button>
                </div>

                <div className="checkout-summary-area">
                    <ProductSummary cartItems={cartItems} />
                    <div style={styles.billingCard}>
                        <div style={styles.billingRow}><span>Subtotal:</span> <span>₹{subtotal.toFixed(2)}</span></div>
                        <div style={styles.billingRow}><span>Shipping:</span> <span>₹{SHIPPING_COST.toFixed(2)}</span></div>
                        <div style={styles.billingRow}><span>Tax (5%):</span> <span>₹{tax.toFixed(2)}</span></div>
                        <hr />
                        <div style={{...styles.billingRow, fontWeight: 'bold', fontSize: '1.2rem'}}>
                            <span>Total:</span> <span>₹{total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

const styles = {
    section: { backgroundColor: '#fff', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', marginBottom: '20px' },
    heading: { fontSize: '1.4rem', color: '#2d3436', marginBottom: '20px', fontWeight: '600' },
    label: { display: 'block', fontSize: '0.9rem', color: '#636e72', marginBottom: '5px' },
    input: { width: '100%', padding: '12px', marginTop: '5px', border: '1px solid #dfe6e9', borderRadius: '8px', boxSizing: 'border-box' },
    split: { display: 'flex', justifyContent: 'space-between' },
    submitBtn: { width: '100%', padding: '15px', borderRadius: '8px', fontSize: '1.1rem', cursor: 'pointer', border: 'none', backgroundColor: '#27ae60', color: 'white', fontWeight: 'bold' },
    billingCard: { backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '12px', marginTop: '20px' },
    billingRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: '#2d3436' }
};

export default Checkout;