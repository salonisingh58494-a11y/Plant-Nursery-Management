import React, { useState } from 'react';
import './ProfilePage.css';
import { FaUser, FaFolder, FaPowerOff, FaChevronRight, FaWallet, FaStar } from 'react-icons/fa';

const ProfilePage = () => {
    // State for user data
    const [userData, setUserData] = useState({
        firstName: "Nature",
        lastName: "Lover",
        email: "user@paryavaran.com",
        mobile: "919303258911",
        gender: "male"
    });

    // States to toggle edit mode for each section
    const [editMode, setEditMode] = useState({
        name: false,
        email: false,
        mobile: false
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    // Toggle Edit/Save
    const toggleEdit = (section) => {
        setEditMode({ ...editMode, [section]: !editMode[section] });
    };

    return (
        <div className="profile-page-wrapper">
            <div className="profile-container">
                {/* LEFT SIDEBAR */}
                <div className="profile-sidebar">
                    <div className="user-header-card">
                        <img src="https://via.placeholder.com/50" alt="User" className="user-img" />
                        <div className="user-welcome">
                            <small>Hello,</small>
                            <p>{userData.firstName} {userData.lastName}</p>
                        </div>
                    </div>

                    <div className="sidebar-menu shadow-sm">
                        <button className="menu-btn border-b" onClick={() => alert('Redirecting to Orders...')}>
                            <FaFolder className="menu-icon text-green" />
                            <span>MY ORDERS</span>
                            <FaChevronRight className="arrow-icon" />
                        </button>

                        <div className="menu-section">
                            <div className="menu-title">
                                <FaUser className="menu-icon text-green" />
                                <span>ACCOUNT SETTINGS</span>
                            </div>
                            <ul className="sub-menu">
                                <li className="active">Profile Information</li>
                                <li onClick={() => alert('Manage Addresses')}>Manage Addresses</li>
                                <li onClick={() => alert('PAN Information')}>PAN Card Information</li>
                            </ul>
                        </div>

                        <div className="menu-section">
                            <div className="menu-title">
                                <FaWallet className="menu-icon text-green" />
                                <span>PAYMENTS</span>
                            </div>
                            <ul className="sub-menu">
                                <li>Gift Cards <span className="wallet-bal text-green">₹0</span></li>
                                <li onClick={() => alert('Saved UPI')}>Saved UPI</li>
                                <li onClick={() => alert('Saved Cards')}>Saved Cards</li>
                            </ul>
                        </div>

                        <div className="menu-section">
                            <div className="menu-title">
                                <FaStar className="menu-icon text-green" />
                                <span>MY STUFF</span>
                            </div>
                            <ul className="sub-menu">
                                <li onClick={() => alert('My Coupons')}>My Coupons</li>
                                <li onClick={() => alert('My Reviews')}>My Reviews & Ratings</li>
                                <li onClick={() => alert('Notifications')}>All Notifications</li>
                                <li onClick={() => alert('Wishlist')}>My Wishlist</li>
                            </ul>
                        </div>

                        <button className="menu-btn border-t logout-item" onClick={() => alert('Logging out...')}>
                            <FaPowerOff className="menu-icon text-green" />
                            <span>Logout</span>
                        </button>
                    </div>

                    <div className="frequent-links shadow-sm">
                        <p>Frequently Visited:</p>
                        <div className="f-links">
                            <span>Track Order</span>
                            <span>Help Center</span>
                        </div>
                    </div>
                </div>

                {/* RIGHT CONTENT AREA */}
                <div className="profile-content shadow-sm">
                    <div className="content-card">
                        {/* Personal Info */}
                        <div className="card-header">
                            <h3>Personal Information</h3>
                            <span className="edit-link" onClick={() => toggleEdit('name')}>
                                {editMode.name ? 'Save' : 'Edit'}
                            </span>
                        </div>
                        <div className="input-row">
                            <input 
                                type="text" name="firstName" 
                                value={userData.firstName} 
                                onChange={handleChange}
                                disabled={!editMode.name} 
                                className={`p-input ${editMode.name ? 'active-input' : ''}`} 
                            />
                            <input 
                                type="text" name="lastName" 
                                value={userData.lastName} 
                                onChange={handleChange}
                                disabled={!editMode.name} 
                                className={`p-input ${editMode.name ? 'active-input' : ''}`} 
                            />
                        </div>
                        
                        <div className="gender-selection">
                            <label>Your Gender</label>
                            <div className="radio-group">
                                <input 
                                    type="radio" name="gender" value="male" id="male" 
                                    checked={userData.gender === 'male'} 
                                    onChange={handleChange}
                                    disabled={!editMode.name}
                                /> 
                                <label htmlFor="male">Male</label>
                                
                                <input 
                                    type="radio" name="gender" value="female" id="female" 
                                    checked={userData.gender === 'female'} 
                                    onChange={handleChange}
                                    disabled={!editMode.name}
                                /> 
                                <label htmlFor="female">Female</label>
                            </div>
                        </div>

                        {/* Email Section */}
                        <div className="card-header mt-4">
                            <h3>Email Address</h3>
                            <span className="edit-link" onClick={() => toggleEdit('email')}>
                                {editMode.email ? 'Save' : 'Edit'}
                            </span>
                        </div>
                        <div className="input-row single">
                            <input 
                                type="email" name="email"
                                value={userData.email} 
                                onChange={handleChange}
                                disabled={!editMode.email} 
                                className={`p-input ${editMode.email ? 'active-input' : ''}`} 
                            />
                        </div>

                        {/* Mobile Section */}
                        <div className="card-header mt-4">
                            <h3>Mobile Number</h3>
                            <span className="edit-link" onClick={() => toggleEdit('mobile')}>
                                {editMode.mobile ? 'Save' : 'Edit'}
                            </span>
                        </div>
                        <div className="input-row single">
                            <input 
                                type="text" name="mobile"
                                value={userData.mobile} 
                                onChange={handleChange}
                                disabled={!editMode.mobile} 
                                className={`p-input ${editMode.mobile ? 'active-input' : ''}`} 
                            />
                        </div>

                        {/* FAQs SECTION */}
                        <div className="faq-section mt-5">
                            <h4>FAQs</h4>
                            <div className="faq-item">
                                <p className="q">What happens when I update my email address (or mobile number)?</p>
                                <p className="a">Your login email id (or mobile number) changes, likewise. You'll receive all your account related communication on your updated email address (or mobile number).</p>
                            </div>
                            <div className="faq-item">
                                <p className="q">When will my Paryavaran account be updated with the new email address?</p>
                                <p className="a">It happens as soon as you confirm the verification code sent to your email (or mobile) and save the changes.</p>
                            </div>
                            <div className="faq-item">
                                <p className="q">What happens to my existing Paryavaran account when I update my email address (or mobile number)?</p>
                                <p className="a">Updating your email address (or mobile number) doesn't invalidate your account. Your account remains fully functional. You'll continue seeing your Order history, saved information and personal details.</p>
                            </div>
                            <div className="faq-item">
                                <p className="q">Does my Seller account get affected when I update my email address?</p>
                                <p className="a">Paryavaran has a 'single sign-on' policy. Any changes will reflect in your Seller account also.</p>
                            </div>
                        </div>

                        <div className="danger-zone">
                            <p className="deactivate" onClick={() => alert('Deactivating Account...')}>Deactivate Account</p>
                            <p className="delete" onClick={() => alert('Deleting Account...')}>Delete Account</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;