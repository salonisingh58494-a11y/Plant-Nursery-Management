import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./Seeds.css";
import { useCart } from "../context/CartContext";
import { allSeeds } from "../data/seedsData";

const faqs = [
  { question: "How long do seeds take to germinate?", answer: "Most seeds germinate within 7–14 days depending on the variety and soil temperature." },
  { question: "Do seeds need sunlight to germinate?", answer: "Most seeds require warmth and moisture more than light to sprout, but once they pop out, light is essential." },
  { question: "How deep should seeds be planted?", answer: "A general rule of thumb is to plant seeds at a depth that is twice their diameter." },
  { question: "Can I grow seeds indoors?", answer: "Yes, you can start seeds indoors in trays with proper seed-starting mix and enough light." },
  { question: "Why are my seeds not sprouting?", answer: "This could be due to old seeds, poor soil quality, inconsistent watering, or incorrect temperature." },
];

export default function Seeds() {
  const { addToCart, addToWishlist, wishlist } = useCart();
  const [currentPage, setCurrentPage] = useState(1);
  const [openFAQ, setOpenFAQ] = useState(null);
  const seedsPerPage = 12;

  const indexOfLastSeed = currentPage * seedsPerPage;
  const indexOfFirstSeed = indexOfLastSeed - seedsPerPage;
  const currentSeeds = allSeeds.slice(indexOfFirstSeed, indexOfLastSeed);
  const totalPages = Math.ceil(allSeeds.length / seedsPerPage);

  return (
    <div className="seeds-page">
      <div className="breadcrumb">Home / Seeds</div>
      <div className="plants-banner"><video src="/seeds/bannervideo.mp4" autoPlay loop muted></video></div>

      <div className="seeds-header">
        <h2>Grow Your Own Garden</h2>
        <div className="seeds-controls">
          <button className="seeds-filter-btn">Filter</button>
          <select className="seeds-sort-select">
            <option>Featured</option>
            <option>Best selling</option>
            <option>Price, low to high</option>
            <option>Price, high to low</option>
          </select>
        </div>
      </div>

      <div className="seeds-grid">
        {currentSeeds.map((seed) => {
          const isWishlisted = wishlist?.some(item => item.id === seed.id);
          return (
            <div key={seed.id} className="seed-card">
              {seed.tag && <span className="tag">{seed.tag}</span>}
              
              <div className="image-box">
                <div className="wishlist-icon-inside" onClick={() => addToWishlist(seed)}>
                  {isWishlisted ? <FaHeart color="red" /> : <FaRegHeart color="white" />}
                </div>
                
                <Link to={`/seed/${seed.id}`}>
                  <img src={seed.img} className="img-front" alt={seed.name} />
                  <img src={seed.hover} className="img-hover" alt={seed.name} />
                </Link>
              </div>

              <Link to={`/seed/${seed.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <h4 className="hover-green">{seed.name}</h4>
              </Link>

              <div className="seed-rating">
                {[...Array(5)].map((_, index) => (
                  <span key={index} style={{ color: index < seed.rating ? "#FFD700" : "#ccc" }}>★</span>
                ))}
              </div>

              <div className="price">₹ {seed.price} <span>₹ {seed.oldPrice}</span></div>
              
              <button className="cart-btn" onClick={() => addToCart(seed)}>
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

      <section className="seed-content" style={{lineHeight: '1.8', marginTop: '40px'}}>
        <h3>Starting Your Journey: Growing Plants from Seeds</h3>
        <p>1. Starting from seeds is the most cost-effective way to grow a diverse and lush garden at home.</p>
        <p>2. Always use a high-quality seed starting mix rather than garden soil for better germination rates.</p>
        <p>3. Maintaining consistent moisture is key; seeds should never dry out completely during the sprouting phase.</p>
        <p>4. Label your trays or pots immediately after planting so you don't forget which seed is growing where.</p>
        <p>5. Providing bottom heat using a heat mat can significantly speed up the germination of tropical seeds.</p>
        <p>6. Thinning out seedlings is necessary to ensure the strongest plants have enough room and nutrients to grow.</p>
        <p>7. Hardening off seedlings by gradually exposing them to outdoor conditions prevents transplant shock.</p>
        <p>8. Vegetable seeds like tomatoes and chillies need deep containers to develop a strong and healthy root system.</p>
        <p>9. Proper storage of leftover seeds in a cool, dry, and dark place helps maintain their viability for next season.</p>
        <p>10. Gardening from seeds teaches patience and provides a deep sense of accomplishment when you finally harvest.</p>
      </section>

      <div className="seeds-faqs">
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