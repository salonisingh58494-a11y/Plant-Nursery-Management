
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OrderProcessing() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/order-success');
        }, 3000);
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div style={styles.overlay}>
            <div style={styles.loaderContainer}>
                <div className="spinner"></div>
                <h2 style={styles.text}>Securing Your Payment...</h2>
                <p style={styles.subText}>Please do not refresh the page or click back.</p>
            </div>
            <style>{`
                .spinner {
                    border: 4px solid #f3f3f3;
                    border-top: 4px solid #00b894;
                    border-radius: 50%;
                    width: 50px;
                    height: 50px;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 20px;
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}

const styles = {
    overlay: { height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
    loaderContainer: { textAlign: 'center', animation: 'fadeIn 0.5s ease-in' },
    text: { color: '#2d3436', marginBottom: '10px', fontFamily: 'Poppins, sans-serif' },
    subText: { color: '#636e72', fontSize: '0.9em' }
};