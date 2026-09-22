import React from 'react';
import { FaSignOutAlt, FaExclamationTriangle } from 'react-icons/fa';
// Yaha path fix kiya gaya hai (Logout.css ko LogoutModal.css kiya)
import './LogoutModal.css'; 

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
    // Agar modal open nahi hai to kuch mat dikhao
    if (!isOpen) return null;

    // Overlay par click hone se modal band ho jaye (sirf agar bahar click ho)
    const handleOverlayClick = (e) => {
        if (e.target.className === 'logout-overlay') {
            onClose();
        }
    };

    return (
        <div className="logout-overlay" onClick={handleOverlayClick}>
            <div className="logout-modal">
                <div className="logout-icon-box">
                    <FaExclamationTriangle className="warn-icon" />
                </div>
                <h3>Confirm Logout</h3>
                <p>Are you sure you want to log out from your Paryavaran account?</p>
                
                <div className="logout-actions">
                    <button className="cancel-btn" onClick={onClose}>
                        No, Stay
                    </button>
                    <button className="confirm-btn" onClick={onConfirm}>
                        <FaSignOutAlt /> Yes, Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogoutModal;