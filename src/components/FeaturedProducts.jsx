import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./FeaturedProducts.css";

export default function FeaturedProducts() {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      title: "Pack of 4 Home Air Purifier Plant Bundle",
      img: "/p1.webp",
      badge: "Selling Out Fast!",
      price: 749,
      oldPrice: 1499,
    },
    {
      id: 2,
      title: "Combo of 4 Plant Set for Office Desk",
      img: "/p2.webp",
      badge: "Selling Out Fast!",
      price: 749,
      oldPrice: 1499,
    },
    {
      id: 3,
      title: "Combo of 6 Bedroom Oxygen Boosting Plants",
      img: "/p3.webp",
      badge: "Sale Price",
      price: 1199,
      oldPrice: 2249,
    },
    {
      id: 4,
      title: "Set of 6 Air Purifying Indoor Plant Bundle",
      img: "/p4.jpg",
      badge: "Selling Out Fast!",
      price: 949,
      oldPrice: 1799,
    },
  ];

  const handleAddToCart = (product) => {
    addToCart(product);
    navigate("/cart");
  };

  return (
    <section className="featured-section">
      <div className="products-grid">
        {products.map((item) => (
          <div className="product-card" key={item.id}>
            <div className="img-wrap">
              <img src={item.img} alt={item.title} />
              {item.badge && <span className="badge">{item.badge}</span>}
            </div>

            <h4 className="product-title">{item.title}</h4>

            <div className="price-row">
              <span className="price">₹ {item.price}</span>
              <span className="old-price">₹ {item.oldPrice}</span>
            </div>

            <button 
              className="cart-btn" 
              onClick={() => handleAddToCart(item)}
            >
              ADD TO CART
            </button>
          </div>
        ))}
      </div>

      <div className="view-all-wrap">
        <button className="view-all" onClick={() => navigate("/plants")}>
          View all
        </button>
      </div>
    </section>
  );
}