import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext'; 

export default function ProductSummary() {
    const { getOrderSummary, cartItems } = useCart();
    const navigate = useNavigate();

    // getOrderSummary crash na ho isliye safety check
    const summary = getOrderSummary ? getOrderSummary() : { subtotal: 0, shipping: 0, tax: 0, total: 0 };
    const { subtotal, shipping, tax, total } = summary;
    
    const TAX_PERCENTAGE = 18;

    const formatCurrency = (amount) => `₹ ${amount.toFixed(2)}`;
    
    const handleBuyNow = () => {
        if (cartItems.length > 0) {
            navigate('/checkout'); // ✅ Sahi path par redirect
        } else {
            alert("Your cart is empty! Please add some plants first.");
        }
    };

    return (
        <div 
            style={{ 
                flex: '2', 
                minWidth: '300px', 
                backgroundColor: '#f9f9f9', 
                padding: '20px', 
                borderRadius: '8px', 
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)', 
                height: 'fit-content' 
            }}
        >
            <h2 style={{ borderBottom: '2px solid #ddd', paddingBottom: '10px', marginBottom: '20px', color: '#555' }}>🛍️ Order Summary</h2>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span>Subtotal:</span>
                <span style={{ fontWeight: '600' }}>{formatCurrency(subtotal)}</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span>Shipping:</span>
                <span style={{ color: shipping > 0 ? '#cc0000' : '#28a745', fontWeight: '600' }}>
                    {shipping > 0 ? formatCurrency(shipping) : 'FREE'}
                </span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
                <span>Taxes ({TAX_PERCENTAGE}%):</span>
                <span style={{ fontWeight: '600' }}>{formatCurrency(tax)}</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.4em', fontWeight: 'bold', color: '#007bff' }}>
                <span>Order Total:</span>
                <span>{formatCurrency(total)}</span>
            </div>

            <button 
                className="buy-now-button"
                onClick={handleBuyNow}
                style={{ 
                    width: '100%',
                    padding: '15px 30px', 
                    backgroundColor: '#ff6f61', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '8px', 
                    cursor: 'pointer', 
                    fontSize: '1.1em',
                    marginTop: '30px',
                    transition: 'background-color 0.3s'
                }}
            >
                Proceed to Checkout
            </button>
        </div>
    );
}