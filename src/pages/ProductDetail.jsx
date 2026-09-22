import React, { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { allPlants } from "../data/plantsData";
import "./ProductDetail.css";

const reviews = [
  { id: 1, name: "Aishwarya Roy", text: "The plant arrived in excellent condition with very secure packaging.", img: "https://i.pravatar.cc/150?u=aish" },
  { id: 2, name: "Samarth Goyal", text: "Amazing quality plant and fast delivery. Highly recommended!", img: "https://i.pravatar.cc/150?u=sam" },
  { id: 3, name: "Riya Sharma", text: "My living room looks beautiful now thanks to this plant!", img: "https://i.pravatar.cc/150?u=riya" },
  { id: 4, name: "Kunal Verma", text: "Exactly what I saw on the website. Very happy with the purchase.", img: "https://i.pravatar.cc/150?u=kunal" },
  { id: 5, name: "Megha Patel", text: "Healthy plant and very fresh leaves.", img: "https://i.pravatar.cc/150?u=megha" }
];

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const sliderRef = useRef();

  const [quantity, setQuantity] = useState(1);
  const [mainImg, setMainImg] = useState("");

  const product = allPlants.find((p) => p.id === id);

  useEffect(() => {
    if (product) {
      setMainImg(product.img);
      window.scrollTo(0, 0);
    }
  }, [id, product]);

  if (!product) return <div className="not-found">Product Not Found</div>;

  const similarProducts = allPlants
    .filter((p) => p.id !== id && p.category === product.category)
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
              {product.gallery.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="thumbnail"
                  className={mainImg === img ? "active-thumb" : ""}
                  onClick={() => setMainImg(img)}
                />
              ))}
            </div>
          </div>

          <div className="product-info-side">
            <nav className="breadcrumb">Home / {product.category} / {product.name}</nav>
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
              <h3>About The Product</h3>
              <p>{product.description}</p>
            </div>
          </div>
        </div>

        <h2 className="section-title">Similar Products</h2>
        <div className="similar-grid">
          {similarProducts.map((p) => (
            <div key={p.id} className="similar-card">
              <Link to={`/product/${p.id}`}>
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

        <h2 className="section-title">From Happy Plant Parents</h2>
        <div className="testimonial-slider">
          <button className="slider-btn" onClick={slideLeft}>
            <FaChevronLeft />
          </button>
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
          <button className="slider-btn" onClick={slideRight}>
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}