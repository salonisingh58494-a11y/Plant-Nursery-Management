import React, { useState } from 'react';
import { FaBell, FaCheckCircle, FaTruck, FaTag, FaTrashAlt } from 'react-icons/fa';
import './NotificationsPage.css';

const NotificationsPage = () => {
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: 'order',
            title: 'Order Delivered!',
            desc: 'Your order for Ewings Storage Box has been delivered successfully.',
            time: '2 hours ago',
            isNew: true,
            icon: <FaCheckCircle style={{color: '#26a541'}} />
        },
        {
            id: 2,
            type: 'promo',
            title: 'Big Saving Days are here!',
            desc: 'Get up to 80% off on all eco-friendly products. Shop now!',
            time: '5 hours ago',
            isNew: true,
            icon: <FaTag style={{color: '#2874f0'}} />
        },
        {
            id: 3,
            type: 'shipping',
            title: 'Package Shipped',
            desc: 'Your item from Paryavaran is out for delivery.',
            time: 'Yesterday',
            isNew: false,
            icon: <FaTruck style={{color: '#ff9f00'}} />
        }
    ]);

    const deleteNotification = (id) => {
        setNotifications(notifications.filter(n => n.id !== id));
    };

    return (
        <div className="notif-wrapper">
            <div className="notif-card shadow-sm">
                <div className="notif-header">
                    <h2><FaBell className="bell-icon" /> All Notifications</h2>
                    <button className="mark-read-btn">Mark all as read</button>
                </div>

                <div className="notif-list">
                    {notifications.length > 0 ? (
                        notifications.map((notif) => (
                            <div key={notif.id} className={`notif-item ${notif.isNew ? 'unread' : ''}`}>
                                <div className="notif-icon-circle">
                                    {notif.icon}
                                </div>
                                <div className="notif-content">
                                    <h4 className="notif-title">{notif.title}</h4>
                                    <p className="notif-desc">{notif.desc}</p>
                                    <span className="notif-time">{notif.time}</span>
                                </div>
                                <button className="notif-delete" onClick={() => deleteNotification(notif.id)}>
                                    <FaTrashAlt />
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="empty-notif">
                            <img src="https://cdn-icons-png.flaticon.com/512/3602/3602145.png" alt="no notif" />
                            <p>No new notifications!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotificationsPage;