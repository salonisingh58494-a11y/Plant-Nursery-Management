import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash, FaHeart, FaEye, FaShoppingCart, FaBolt } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import './WishlistPage.css';

const WishlistPage = () => {
  const { wishlist, removeFromWishlist, addToCart } = useCart();
  const navigate = useNavigate();

  const handleBuyNow = (product) => {
    addToCart(product);
    navigate('/cart');
  };

  return (
    <div className="wishlist-page-container">
      <div className="wishlist-header">
        <h1><FaHeart color="red" /> My Wishlist</h1>
        <p>{wishlist.length} Items saved</p>
      </div>

      <div className="wishlist-horizontal-list">
        {wishlist.map((item) => (
          <div key={item.id} className="wishlist-horizontal-card">
            <button className="corner-delete-btn" onClick={() => removeFromWishlist(item.id)}>
              <FaTrash />
            </button>

            <div className="wishlist-img-box">
              {/* IMAGE FIX: item.img1 use karein */}
              <img src={item.img1} alt={item.name} onError={(e) => e.target.src = 'https://via.placeholder.com/150'} />
            </div>

            <div className="wishlist-details-box">
              <h3>{item.name}</h3>
              <div className="price-row">
                <span className="new-p">₹{item.price}</span>
              </div>
            </div>

            <div className="wishlist-actions-box">
              <button className="buy-now-btn" onClick={() => handleBuyNow(item)}>
                <FaBolt /> Buy Now
              </button>
              <button className="add-to-cart-btn" onClick={() => addToCart(item)}>
                <FaShoppingCart /> Add to Cart
              </button>
              {/* VIEW DETAILS LINK RESTORED */}
              <Link to={`/product/${item.id}`} className="view-link-text">
                <FaEye /> View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;