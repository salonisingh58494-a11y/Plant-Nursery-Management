import React, { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { allPots } from "../data/potsData";
import "./ProductDetail.css";

const reviews = [
  { id: 1, name: "Vikram Rathore", text: "The finish is amazing. It looks very premium in my living room.", img: "https://i.pravatar.cc/150?u=vikram" },
  { id: 2, name: "Ananya Iyer", text: "Very sturdy and the drainage is well-designed. Happy with the purchase.", img: "https://i.pravatar.cc/150?u=ananya" },
  { id: 3, name: "Rohan Das", text: "Packaged very securely. Not a single scratch on the ceramic.", img: "https://i.pravatar.cc/150?u=rohan" },
  { id: 4, name: "Meera K.", text: "The self-watering feature actually works! My plants are thriving.", img: "https://i.pravatar.cc/150?u=meera" }
];

export default function PotDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const sliderRef = useRef();

  const [quantity, setQuantity] = useState(1);
  const [mainImg, setMainImg] = useState("");

  const product = allPots.find(p => String(p.id) === String(id));

  useEffect(() => {
    if (product) {
      setMainImg(product.img);
      window.scrollTo(0, 0);
    }
  }, [id, product]);

  if (!product) {
    return (
      <div className="not-found-msg" style={{padding: "100px", textAlign: "center"}}>
        <h2>Pot Product Not Found</h2>
        <p>ID: {id}</p>
        <Link to="/pots" style={{color: "green", textDecoration: "underline"}}>Back to Pots</Link>
      </div>
    );
  }

  const similarPots = allPots
    .filter(p => p.id !== id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  const handleBuyNow = () => {
    addToCart({ ...product, quantity });
    navigate("/cart");
  };

  const slideLeft = () => sliderRef.current.scrollBy({ left: -320, behavior: "smooth" });
  const slideRight = () => sliderRef.current.scrollBy({ left: 320, behavior: "smooth" });

  return (
    <div className="pd-wrapper">
      <div className="product-detail-container">
        <div className="main-product-row">
          <div className="product-image-side">
            <div className="main-img-container">
              <img src={mainImg} alt={product.name} />
            </div>
            <div className="thumbnail-slider">
              {product.gallery && product.gallery.map((img, i) => (
                <img 
                  key={i} 
                  src={img} 
                  alt="thumb"
                  className={mainImg === img ? "active-thumb" : ""} 
                  onClick={() => setMainImg(img)} 
                />
              ))}
            </div>
          </div>

          <div className="product-info-side">
            <nav className="breadcrumb">Home / Pots / {product.name}</nav>
            <h1>{product.name}</h1>

            <div className="pd-rating-stars">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} color={i < product.rating ? "#FFD700" : "#ccc"} />
              ))}
              <span className="review-count">({reviews.length} Reviews)</span>
            </div>

            <div className="price-tag">
              <span className="current-price">₹{product.price}</span>
              <span className="old-price">₹{product.oldPrice}</span>
            </div>

            <div className="purchase-controls">
              <div className="qty-selector">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)}>+</button>
              </div>
              <button className="add-to-cart-btn" onClick={() => addToCart({ ...product, quantity })}>
                ADD TO CART
              </button>
              <button className="buy-now-btn" onClick={handleBuyNow}>
                BUY NOW
              </button>
            </div>

            <div className="product-specs">
              <h3>Product Overview</h3>
              <p>{product.description}</p>
              <ul className="spec-list">
                <li><strong>Material:</strong> High-quality Durable Build</li>
                <li><strong>Weather Resistance:</strong> UV & Frost Protected</li>
                <li><strong>Placement:</strong> Indoor & Outdoor Friendly</li>
                <li><strong>Drainage:</strong> Optimized with drainage holes</li>
              </ul>
            </div>
          </div>
        </div>

        <h2 className="section-title">Explore More Pots</h2>
        <div className="similar-grid">
          {similarPots.map(p => (
            <div key={p.id} className="similar-card">
              <Link to={`/pot-detail/${p.id}`}>
                <div className="img-wrapper">
                  <img src={p.img} className="main-img" alt={p.name} />
                  <img src={p.hover} className="hover-img" alt={p.name} />
                </div>
                <h4>{p.name}</h4>
              </Link>
              <p className="sim-price">₹{p.price}</p>
              <button className="sim-add-btn" onClick={() => addToCart({ ...p, quantity: 1 })}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        <h2 className="section-title">Customer Feedback</h2>
        <div className="testimonial-slider">
          <button className="slider-btn" onClick={slideLeft}><FaChevronLeft /></button>
          <div className="testimonial-scroll" ref={sliderRef}>
            {reviews.map(r => (
              <div key={r.id} className="testimonial-card">
                <p>"{r.text}"</p>
                <div className="user-info">
                  <img src={r.img} alt={r.name} />
                  <span>{r.name}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="slider-btn" onClick={slideRight}><FaChevronRight /></button>
        </div>
      </div>
    </div>
  );
}