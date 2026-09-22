import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./Pots.css";
import { useCart } from "../context/CartContext";

const potNames = [
  "Ceramic Round Plant Pot", "Plastic Self Watering Pot", "Terracotta Clay Pot",
  "Hanging Metal Planter", "Rectangular Balcony Pot", "Indoor Decorative Pot",
  "White Minimalist Pot", "Fiber Stone Garden Pot", "Large Outdoor Pot",
  "Small Succulent Pot", "Printed Designer Pot", "Matte Finish Pot",
  "Glossy Ceramic Pot", "Concrete Cement Pot", "Tabletop Flower Pot",
  "Modern Square Pot", "Classic Brown Pot", "Colorful Plastic Pot",
  "Wall Mounted Pot", "Herb Growing Pot", "Drainage Hole Pot",
  "Premium Designer Pot", "Balcony Rail Pot", "Textured Finish Pot",
  "Eco Friendly Pot", "Stone Look Pot", "Indoor Planter Bowl",
  "Tall Floor Pot", "Mini Desk Pot", "Handcrafted Clay Pot",
  "UV Resistant Pot", "Garden Pot Set", "Rustic Style Pot",
  "Premium Marble Pot", "Wood Finish Pot", "Modern Indoor Pot",
];

const potsData = potNames.map((name, i) => {
  const dynamicPrice = 299 + (i * 35) % 800;
  const dynamicOldPrice = dynamicPrice + 250;
  const dynamicRating = (i % 3 === 0) ? 5 : (i % 2 === 0) ? 4 : 3;

  return {
    id: `707f1f77bcf86cd7994392${(i + 1).toString().padStart(2, '0')}`,
    name,
    price: dynamicPrice,
    oldPrice: dynamicOldPrice,
    rating: dynamicRating,
    category: "Pots",
    tag: i % 3 === 0 ? "38% OFF" : i % 4 === 0 ? "Best Seller" : "",
    img1: `/pots/pot-${i + 1}.jpg`,
    img2: `/pots/pot-${i + 1}-hover.jpg`,
  };
});

const faqs = [
  { question: "Which pot size is best for indoor plants?", answer: "Small to medium pots (6-10 inches) are ideal for most indoor plants depending on their root system." },
  { question: "Do pots need drainage holes?", answer: "Yes, drainage holes are crucial as they prevent waterlogging, which can lead to root rot." },
  { question: "Which material is best for plant pots?", answer: "Ceramic and terracotta are breathable, while plastic and metal are lightweight and durable." },
  { question: "Can I use decorative pots for planting?", answer: "Yes, but ensure they have drainage or use them as a 'cachepot' by placing a plastic nursery pot inside." },
  { question: "How do I clean reused plant pots?", answer: "Scrub them with mild soap and water, then rinse with a diluted bleach solution to kill any lingering pathogens." },
];

export default function Pots() {
  const { addToCart, addToWishlist, wishlist } = useCart();
  const [currentPage, setCurrentPage] = useState(1);
  const [openFAQ, setOpenFAQ] = useState(null);
  const potsPerPage = 12;

  const indexOfLastPot = currentPage * potsPerPage;
  const indexOfFirstPot = indexOfLastPot - potsPerPage;
  const currentPots = potsData.slice(indexOfFirstPot, indexOfLastPot);
  const totalPages = Math.ceil(potsData.length / potsPerPage);

  return (
    <div className="pots-page">
      <div className="breadcrumb">Home / Pots & Planters</div>
      <div className="plants-banner"><video src="/pots/bannervideo.mp4" autoPlay loop muted></video></div>

      <div className="pots-header">
        <h2>Stylish Pots for Every Plant</h2>
        <div className="pots-controls">
          <button className="pots-filter-btn">Filter</button>
          <select className="pots-sort-select">
            <option>Featured</option>
            <option>Best selling</option>
            <option>Price, low to high</option>
            <option>Price, high to low</option>
          </select>
        </div>
      </div>

      <div className="pots-grid">
        {currentPots.map((pot) => {
          const isWishlisted = wishlist?.some(item => item.id === pot.id);
          return (
            <div key={pot.id} className="pot-card">
              {pot.tag && <span className="tag">{pot.tag}</span>}
              
              <div className="image-box">
                <div className="wishlist-icon-inside" onClick={() => addToWishlist(pot)}>
                  {isWishlisted ? <FaHeart color="red" /> : <FaRegHeart color="white" />}
                </div>
                
                <Link to={`/pot/${pot.id}`}>
                  <img src={pot.img1} className="img-front" alt={pot.name} />
                  <img src={pot.img2} className="img-hover" alt={pot.name} />
                </Link>
              </div>

              <Link to={`/pot/${pot.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <h4 className="hover-green">{pot.name}</h4>
              </Link>

              <div className="pot-rating">
                {[...Array(5)].map((_, index) => (
                  <span key={index} style={{ color: index < pot.rating ? "#FFD700" : "#ccc" }}>★</span>
                ))}
              </div>

              <div className="price">₹ {pot.price} <span>₹ {pot.oldPrice}</span></div>
              
              <button className="cart-btn" onClick={() => addToCart(pot)}>
                ADD TO CART
              </button>
            </div>
          );
        })}
      </div>

      <div className="pagination">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Prev</button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i} className={currentPage === i + 1 ? "active" : ""} onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
        ))}
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
      </div>

      <section className="pot-content" style={{lineHeight: '1.8', marginTop: '40px'}}>
        <h3>Choosing the Perfect Pot: A Guide to Planters</h3>
        <p>1. Selecting the right pot is the first step toward ensuring your plant's long-term health and growth.</p>
        <p>2. Terracotta pots are highly porous and breathable, making them perfect for plants like succulents and cacti.</p>
        <p>3. Ceramic pots are heavier and hold moisture longer, which is ideal for moisture-loving tropical indoor plants.</p>
        <p>4. Modern plastic pots are lightweight, durable, and come in a vast array of colors to match any home decor.</p>
        <p>5. Self-watering pots are a lifesaver for busy plant parents as they provide a consistent water supply for weeks.</p>
        <p>6. Metal planters add a rustic and industrial charm to balconies but should be kept out of direct scorching sun.</p>
        <p>7. Always ensure your pot is about 2 inches wider than the plant's current root ball for comfortable growth.</p>
        <p>8. Proper drainage prevents soil compaction and ensures that oxygen reaches the roots of your favorite plants.</p>
        <p>9. Hanging pots are excellent space-savers for small apartments and create a beautiful vertical garden effect.</p>
        <p>10. A designer pot acts as a piece of art that can instantly transform a simple plant into a focal point of a room.</p>
      </section>

      <div className="pots-faqs">
        <h3>FAQs</h3>
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item" onClick={() => setOpenFAQ(openFAQ === index ? null : index)}>
            <div className="faq-question">
              {faq.question}
              <span>{openFAQ === index ? "-" : "+"}</span>
            </div>
            {openFAQ === index && <div className="faq-answer">{faq.answer}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}