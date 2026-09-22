import React, { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { allFertilizers } from "../data/fertData";
import "./ProductDetail.css";

const reviews = [
  { id: 1, name: "Arjun Mehta", text: "My plants showed visible growth within just a week of using this. Highly recommended!", img: "https://i.pravatar.cc/150?u=arjun" },
  { id: 2, name: "Sana Khan", text: "The packaging was spill-proof and the quality of the fertilizer is top-notch.", img: "https://i.pravatar.cc/150?u=sana" },
  { id: 3, name: "Rajesh G.", text: "Best organic option I've found so far. No foul smell and very easy to apply.", img: "https://i.pravatar.cc/150?u=rajesh" },
  { id: 4, name: "Priya Sharma", text: "Truly effective. My rose plants are blooming like never before.", img: "https://i.pravatar.cc/150?u=priya" }
];

export default function FertDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const sliderRef = useRef();

  const [quantity, setQuantity] = useState(1);
  const [mainImg, setMainImg] = useState("");

  const product = allFertilizers.find(f => String(f.id) === String(id));

  useEffect(() => {
    if (product) {
      setMainImg(product.img || `/fertilizer/fert-${id}.jpg`);
      window.scrollTo(0, 0);
    }
  }, [id, product]);

  if (!product) return <div className="not-found">Product Not Found</div>;

  const similarFertilizers = allFertilizers
    .filter(f => String(f.id) !== String(id))
    .slice(0, 4);

  const handleBuyNow = () => {
    addToCart({ ...product, quantity });
    navigate("/cart");
  };

  const slideLeft = () => sliderRef.current.scrollBy({ left: -320, behavior: "smooth" });
  const slideRight = () => sliderRef.current.scrollBy({ left: 320, behavior: "smooth" });

  const galleryImages = product.gallery || [
    `/fertilizer/fert-${id}.jpg`,
    `/fertilizer/fert-${id}-hover.jpg`,
    `/fertilizer/banner.jpg`
  ];

  return (
    <div className="pd-wrapper">
      <div className="product-detail-container">
        <div className="main-product-row">
          <div className="product-image-side">
            <div className="main-img-container">
              <img src={mainImg} alt={product.name} onError={(e) => e.target.src = "/fertilizer/banner.jpg"} />
            </div>
            {/* Yaha thumbnails add kiye hain */}
            <div className="thumbnail-slider">
              {galleryImages.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="thumbnail"
                  className={mainImg === img ? "active-thumb" : ""}
                  onClick={() => setMainImg(img)}
                  onError={(e) => e.target.style.display = 'none'}
                />
              ))}
            </div>
          </div>

          <div className="product-info-side">
            <nav className="breadcrumb">Home / Fertilizers / {product.name}</nav>
            <h1>{product.name}</h1>
            
            <div className="pd-rating-stars">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} color={i < (product.rating || 4) ? "#FFD700" : "#ccc"} />
              ))}
              <span className="review-count">({reviews.length} Reviews)</span>
            </div>

            <div className="price-tag">
              <span className="current-price">₹{product.price}</span>
              <span className="old-price">₹{product.oldPrice || product.price + 100}</span>
            </div>

            <div className="purchase-controls">
              <div className="qty-selector">
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity((q) => q + 1)}>+</button>
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
              <p>{product.description || "Premium quality fertilizer for your garden."}</p>
              <ul className="spec-list">
                <li><strong>Type:</strong> 100% Pure & Organic</li>
                <li><strong>Usage:</strong> Suitable for all plant stages</li>
                <li><strong>Safe:</strong> Eco-friendly and non-toxic</li>
              </ul>
            </div>
          </div>
        </div>

        <h2 className="section-title">Similar Fertilizers</h2>
        <div className="similar-grid">
          {similarFertilizers.map((f) => (
            <div key={f.id} className="similar-card">
              <Link to={`/fert-detail/${f.id}`}>
                <div className="img-wrapper">
                  <img src={f.img || `/fertilizer/fert-${f.id}.jpg`} className="main-img" alt={f.name} />
                  <img src={f.hover || `/fertilizer/fert-${f.id}-hover.jpg`} className="hover-img" alt={f.name} />
                </div>
                <h4>{f.name}</h4>
              </Link>
              <p className="sim-price">₹{f.price}</p>
              <button className="sim-add-btn" onClick={() => addToCart({ ...f, quantity: 1 })}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        <h2 className="section-title">Customer Feedback</h2>
        <div className="testimonial-slider">
          <button className="slider-btn" onClick={slideLeft}><FaChevronLeft /></button>
          <div className="testimonial-scroll" ref={sliderRef}>
            {reviews.map((r) => (
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