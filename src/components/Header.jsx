import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import { FaUserCircle, FaChevronDown, FaUser, FaBox, FaHeart, FaBell } from 'react-icons/fa';
import { useCart } from "../context/CartContext";
import "./Header.css";

export default function Header({ onLogoutClick }) {
  const { cartItems } = useCart(); 
  const navigate = useNavigate();
  const cartCount = cartItems?.length || 0;

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [accountDropdown, setAccountDropdown] = useState(false);

  const seedNames = [
    "Tomato Hybrid Seeds", "Chilli Hot Pepper Seeds", "Coriander Herb Seeds",
    "Spinach Leafy Seeds", "Carrot Orange Seeds", "Radish White Seeds",
    "Cucumber Garden Seeds", "Brinjal Purple Seeds", "Capsicum Green Seeds",
    "Pumpkin Desi Seeds", "Bottle Gourd Seeds", "Bitter Gourd Seeds",
    "Watermelon Sugar Baby Seeds", "Muskmelon Honey Dew Seeds", "Okra Lady Finger Seeds",
    "French Beans Seeds", "Peas Garden Seeds", "Sunflower Tall Seeds",
    "Marigold Orange Seeds", "Zinnia Mixed Flower Seeds", "Petunia Flower Seeds",
    "Balsam Flower Seeds", "Cosmos Mixed Seeds", "Portulaca Flower Seeds",
    "Mustard Microgreen Seeds", "Fenugreek Methi Seeds", "Basil Herb Seeds",
    "Parsley Herb Seeds", "Lettuce Iceberg Seeds", "Broccoli Green Seeds",
    "Cauliflower Snowball Seeds", "Cabbage Round Seeds", "Beetroot Red Seeds",
    "Turnip White Seeds", "Onion Red Seeds", "Garlic Clove Seeds"
  ];

  const potNames = [
    "Ceramic Round Plant Pot", "Plastic Self Watering Pot", "Terracotta Clay Pot",
    "Hanging Metal Planter", "Rectangular Balcony Pot", "Indoor Decorative Pot",
    "White Minimalist Pot", "Fiber Stone Garden Pot", "Large Outdoor Pot",
    "Small Succulent Pot", "Printed Designer Pot", "Matte Finish Pot",
    "Glossy Ceramic Pot", "Concrete Cement Pot", "Tabletop Flower Pot",
    "Modern Square Pot", "Classic Brown Pot", "Colorful Plastic Pot"
  ];

  const plantNames = [
    "Oxycardium Green Plant with Moss Stick", "Money Plant Golden Pothos", "Snake Plant Laurentii",
    "Peace Lily Indoor Plant", "Areca Palm Air Purifier", "Rubber Plant Dark Green",
    "ZZ Plant Zamioculcas", "Aloe Vera Medicinal Plant", "Jade Plant Crassula",
    "Bamboo Palm Indoor Plant", "Fiddle Leaf Fig Plant", "Spider Plant Chlorophytum",
    "Aglaonema Pink Beauty", "Monstera Deliciosa", "Lucky Bamboo Plant",
    "Croton Petra Plant", "Anthurium Red Flower", "Calathea Orbifolia"
  ];

  const fertilizerNames = [
    "Organic Vermicompost Fertilizer", "Neem Cake Powder Fertilizer", "All Purpose Plant Food",
    "Seaweed Liquid Fertilizer", "Bone Meal Organic Fertilizer", "Potash Booster Fertilizer",
    "Rose Flower Booster", "Indoor Plant Growth Booster", "NPK 19-19-19 Fertilizer",
    "Micronutrient Plant Tonic", "Liquid Bio Fertilizer", "Cactus & Succulent Feed"
  ];

  const allProducts = [
    ...seedNames.map(name => ({ name })),
    ...potNames.map(name => ({ name })),
    ...plantNames.map(name => ({ name })),
    ...fertilizerNames.map(name => ({ name }))
  ];

  useEffect(() => {
    if (searchTerm.trim().length > 0) {
      const filtered = allProducts
        .filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .slice(0, 10);
      setFilteredProducts(filtered);
      setShowDropdown(true);
    } else {
      setFilteredProducts([]);
      setShowDropdown(false);
    }
  }, [searchTerm]);

  const handleSelect = (productName) => {
    setSearchTerm("");
    setShowDropdown(false);
    navigate(`/product/${encodeURIComponent(productName)}`);
  };

  return (
    <>
      <div className="top-bar">
        <p>Free Delivery Above ₹499 | Shop Now</p>
        <p>Get 4 Plants for just ₹699!</p>
        <p>Next day Delivery Available</p>
      </div>

      <header className="main-header">
        <div className="logo">
          <Link to="/">
            <img src="/logo.png" alt="Paryavaran" />
          </Link>
        </div>

        <nav className="nav-links-inline">
          <Link to="/plants" className="nav-item">PLANTS</Link>
          <Link to="/seeds" className="nav-item">SEEDS</Link>
          <Link to="/pots" className="nav-item">POTS</Link>
          <Link to="/fertilizer" className="nav-item">CARE</Link>
          <Link to="/blog" className="nav-item">BLOG</Link>
        </nav>

        <div className="search-container">
          <div className="search-box">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search plants..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              onFocus={() => searchTerm.length > 0 && setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            />
            {showDropdown && (
              <div className="search-dropdown">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product, index) => (
                    <div key={index} className="search-item" onClick={() => handleSelect(product.name)}>
                      <div className="search-item-content">
                        <span className="search-name">{product.name}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-result">No products found</div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="header-icons">
          <div
            className="account-menu-wrapper"
            onMouseEnter={() => setAccountDropdown(true)}
            onMouseLeave={() => setAccountDropdown(false)}
          >
            <Link to="/dashboard" className="account-trigger-link">
              <div className="account-trigger">
                <FaUserCircle className="icon-main" />
                <span>Account</span>
                <FaChevronDown className={`chevron ${accountDropdown ? 'rotate' : ''}`} />
              </div>
            </Link>

            {accountDropdown && (
              <div className="dropdown-menu">
                <div className="dropdown-arrow"></div>
                <div className="auth-dropdown-header">
                  <Link to="/login" className="drop-login-btn">Login</Link>
                </div>
                <ul className="drop-list">
                  <li><Link to="/profile"><FaUser className="drop-icon" /> My Profile</Link></li>
                  <li><Link to="/orders"><FaBox className="drop-icon" /> Orders</Link></li>
                  <li><Link to="/wishlist"><FaHeart className="drop-icon" /> Wishlist</Link></li>
                  <li><Link to="/notify"><FaBell className="drop-icon" /> Notifications</Link></li>
                </ul>
              </div>
            )}
          </div>

          <Link to="/cart" className="cart-icon">
            <FiShoppingCart size={24} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </div>
      </header>
    </>
  );
}