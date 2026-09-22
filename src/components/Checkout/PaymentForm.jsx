// PaymentForm.js
import React, { useState } from 'react';
// import './Checkout.css';

const PaymentForm = () => {
    const [selectedOption, setSelectedOption] = useState('card');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const CardDetails = () => (
        <div className={`payment-details ${selectedOption === 'card' ? 'visible' : ''}`}>
            <div className="form-group">
                <label>Card Number</label>
                <input type="text" placeholder="XXXX XXXX XXXX XXXX" maxLength="16" required />
            </div>
            <div className="form-group">
                <label>Name on Card</label>
                <input type="text" placeholder="John Doe" required />
            </div>
            <div className="card-split">
                <div className="form-group">
                    <label>Expiration</label>
                    <input type="text" placeholder="MM/YY" maxLength="5" required />
                </div>
                <div className="form-group">
                    <label>CVC</label>
                    <input type="password" placeholder="CVC" maxLength="4" required />
                </div>
            </div>
        </div>
    );

    return (
        <section className="payment-options">
            <h2>💳 Payment Method</h2>
            <div className="payment-selection">
                {/* Credit/Debit Card Option with Hover Effect */}
                <label className="payment-option">
                    <input 
                        type="radio" 
                        name="payment" 
                        value="card" 
                        checked={selectedOption === 'card'}
                        onChange={handleOptionChange}
                    />
                    Credit/Debit Card (Visa, MasterCard)
                </label>

                {/* PayPal Option with Hover Effect */}
                <label className="payment-option">
                    <input 
                        type="radio" 
                        name="payment" 
                        value="paypal" 
                        checked={selectedOption === 'paypal'}
                        onChange={handleOptionChange}
                    />
                    PayPal
                </label>
                
                {/* Apple Pay/Google Pay Option with Hover Effect */}
                <label className="payment-option">
                    <input 
                        type="radio" 
                        name="payment" 
                        value="applepay" 
                        checked={selectedOption === 'applepay'}
                        onChange={handleOptionChange}
                    />
                    Apple Pay / Google Pay
                </label>
            </div>
            
            {/* Dynamic Card Details Form with Transition */}
            <CardDetails />
            
            {/* The Place Order button can be managed here or in the parent */}
        </section>
    );
};

export default PaymentForm;