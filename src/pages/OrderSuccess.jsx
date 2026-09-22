// src/pages/OrderSuccess.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheckCircle } from 'react-icons/fi';

export default function OrderSuccess() {
    const navigate = useNavigate();

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <FiCheckCircle size={80} color="#00b894" style={styles.icon} />
                <h1 style={styles.title}>Order Placed Successfully!</h1>
                <p style={styles.orderId}>Order ID: <b>#PV-{Math.floor(Math.random() * 90000) + 10000}</b></p>
                
                <div style={styles.infoBox}>
                    <p>A confirmation email has been sent to your inbox.</p>
                    <p>Estimated Delivery: <b>3-5 Business Days</b></p>
                </div>

                <button 
                    onMouseOver={(e) => e.target.style.backgroundColor = '#009d7d'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#00b894'}
                    onClick={() => navigate('/')}
                    style={styles.button}
                >
                    Continue Shopping
                </button>
            </div>
        </div>
    );
}

const styles = {
    container: {
        height: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
    },
    card: {
        backgroundColor: 'white', padding: '50px', borderRadius: '20px', textAlign: 'center',
        boxShadow: '0 15px 35px rgba(0,0,0,0.1)', transform: 'translateY(0)',
        transition: 'transform 0.3s ease', maxWidth: '500px', width: '90%'
    },
    title: { color: '#2d3436', margin: '20px 0 10px', fontSize: '1.8rem' },
    orderId: { color: '#636e72', marginBottom: '20px' },
    infoBox: { backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '12px', marginBottom: '30px', color: '#4a5568' },
    button: {
        backgroundColor: '#00b894', color: 'white', border: 'none', padding: '15px 35px',
        borderRadius: '30px', cursor: 'pointer', fontSize: '1.1rem', fontWeight: '600',
        transition: 'all 0.3s ease', boxShadow: '0 4px 15px rgba(0,184,148,0.3)'
    },
    icon: { animation: 'bounce 2s infinite' }
};