import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaStar, FaChevronRight, FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';
import './OrdersPage.css';

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem("token");
            const { data } = await axios.get("http://localhost:5000/api/orders/myorders", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setOrders(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching orders:", error);
            setLoading(false);
        }
    };

    const handleDeleteHistory = async () => {
        if (window.confirm("Are you sure you want to clear your order history?")) {
            try {
                const token = localStorage.getItem("token");
                await axios.delete("http://localhost:5000/api/orders/clear-history", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setOrders([]); 
            } catch (error) {
                console.error("Delete error:", error);
                alert("Could not delete history. Please check console.");
            }
        }
    };

    useEffect(() => { fetchOrders(); }, []);

    if (loading) return <div className="loader-container"><div className="spinner"></div></div>;

    return (
        <div className="orders-page-wrapper">
            <div className="orders-header-flex">
                <div className="breadcrumb-nav">
                    <Link to="/">Home</Link> <FaChevronRight className="b-icon" /> <span>My Orders</span>
                </div>
                {orders.length > 0 && (
                    <button className="delete-history-btn" onClick={handleDeleteHistory}>
                        <FaTrashAlt /> Clear History
                    </button>
                )}
            </div>

            <div className="orders-main-layout">
                <main className="orders-list-container">
                    <div className="order-search-box">
                        <input type="text" placeholder="Search your orders here" />
                        <button className="search-trigger-green"><FaSearch /> Search</button>
                    </div>

                    {orders.length === 0 ? (
                        <div className="no-orders-card">
                            <h3>No orders found.</h3>
                            <Link to="/" className="shop-now-btn-green">Start Shopping</Link>
                        </div>
                    ) : (
                        orders.map((order) => (
                            <div key={order._id} className="order-item-card-new">
                                {order.products.map((item, index) => (
                                    <div key={index} className="order-row">
                                        <img 
                                            src={item.image || "https://via.placeholder.com/80"} 
                                            alt="product" 
                                            className="p-img-new" 
                                        />
                                        <div className="p-info">
                                            <h4 className="p-name">{item.name || "Product Info Unavailable"}</h4>
                                            <p className="p-qty">Quantity: {item.quantity}</p>
                                            <p className="p-price-green">₹{item.price || 0}</p>
                                        </div>
                                        <div className="p-status">
                                            <span className={`dot ${(order.status || 'pending').toLowerCase()}`}></span>
                                            {order.status}
                                            <p className="date-text">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                ))}
                                <div className="order-card-footer">
                                    <span>Total Amount: <strong>₹{order.totalAmount}</strong></span>
                                    <button className="rate-btn-green"><FaStar /> Rate & Review</button>
                                </div>
                            </div>
                        ))
                    )}
                </main>
            </div>
        </div>
    );
};

export default OrdersPage;