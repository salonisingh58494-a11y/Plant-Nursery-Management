import React, { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { allSeeds } from "../data/seedsData";
import "./ProductDetail.css";

const reviews = [
  { id: 1, name: "Rahul Mehta", text: "High germination rate! My balcony is full of green now.", img: "https://i.pravatar.cc/150?u=rahul" },
  { id: 2, name: "Sneha Kapoor", text: "The packaging was vacuum sealed. Very professional.", img: "https://i.pravatar.cc/150?u=sneha" },
  { id: 3, name: "Amit Shah", text: "Organic and fresh seeds. Value for money.", img: "https://i.pravatar.cc/150?u=amit" },
  { id: 4, name: "Pooja V.", text: "Instructions on the back were very helpful for a beginner.", img: "https://i.pravatar.cc/150?u=pooja" }
];

export default function SeedDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const sliderRef = useRef();

  const [quantity, setQuantity] = useState(1);
  const [mainImg, setMainImg] = useState("");

  // Finding the product from central data
  const product = allSeeds.find(p => String(p.id) === String(id));

  useEffect(() => {
    if (product) {
      setMainImg(product.img);
      window.scrollTo(0, 0);
    }
  }, [id, product]);

  if (!product) {
    return (
      <div className="not-found-msg" style={{padding: "100px", textAlign: "center"}}>
        <h2>Seed Product Not Found</h2>
        <p>ID: {id}</p>
        <Link to="/seeds" style={{color: "green", textDecoration: "underline"}}>Back to Seeds</Link>
      </div>
    );
  }

  const similarSeeds = allSeeds
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
            <nav className="breadcrumb">Home / Seeds / {product.name}</nav>
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
                <li><strong>Sunlight:</strong> 6-8 hours of direct sun</li>
                <li><strong>Sowing Depth:</strong> 0.5 inches</li>
                <li><strong>Germination Time:</strong> 7-14 Days</li>
                <li><strong>Harvest Time:</strong> 60-90 Days</li>
              </ul>
            </div>
          </div>
        </div>

        <h2 className="section-title">Explore More Seeds</h2>
        <div className="similar-grid">
          {similarSeeds.map(p => (
            <div key={p.id} className="similar-card">
              {/* IMPORTANT: Path must match your Route in App.js */}
              <Link to={`/seed-detail/${p.id}`}>
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