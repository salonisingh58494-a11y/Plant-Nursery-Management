import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./Fertilizer.css";
import { useCart } from "../context/CartContext";

const fertilizerNames = [
  "Organic Vermicompost Fertilizer", "Neem Cake Powder Fertilizer", "All Purpose Plant Food",
  "Seaweed Liquid Fertilizer", "Bone Meal Organic Fertilizer", "Potash Booster Fertilizer",
  "Rose Flower Booster", "Indoor Plant Growth Booster", "NPK 19-19-19 Fertilizer",
  "Micronutrient Plant Tonic", "Liquid Bio Fertilizer", "Cactus & Succulent Feed",
  "Orchid Bloom Booster", "Herbal Plant Nutrition Mix", "Compost Manure Fertilizer",
  "Garden Soil Conditioner", "Organic Root Enhancer", "Fruit Plant Fertilizer",
  "Vegetable Growth Booster", "Flowering Plant Fertilizer", "Urea Granules Fertilizer",
  "Phosphate Rich Organic Manure", "Potting Mix Nutrient Booster", "Calcium Nitrate Fertilizer",
  "Magnesium Sulphate Fertilizer", "Humic Acid Soil Conditioner", "Azospirillum Bio Fertilizer",
  "Phosphobacteria Bio Fertilizer", "Neem Oil Plant Nutrition", "Liquid Sea Mineral Fertilizer",
  "Leafy Growth Booster", "Root Growth Activator", "Soil Enrichment Organic Mix",
  "Balanced NPK Garden Feed", "Premium Lawn Fertilizer", "All Season Plant Nutrition",
];

const fertilizersData = fertilizerNames.map((name, i) => {
  const dynamicPrice = 199 + (i * 25) % 600;
  const dynamicOldPrice = dynamicPrice + 150;
  const dynamicRating = (i % 3 === 0) ? 5 : (i % 2 === 0) ? 4 : 3;

  return {
    id: `807f1f77bcf86cd7994393${(i + 1).toString().padStart(2, '0')}`,
    name,
    price: dynamicPrice,
    oldPrice: dynamicOldPrice,
    rating: dynamicRating,
    category: "Fertilizer",
    tag: i % 3 === 0 ? "Best Seller" : i % 4 === 0 ? "Limited Stock" : "",
    img1: `/fertilizer/fert-${i + 1}.jpg`,
    img2: `/fertilizer/fert-${i + 1}-hover.jpg`,
  };
});

const faqs = [
  { question: "How often should fertilizer be applied?", answer: "Most fertilizers should be applied every 2–4 weeks during the growing season (Spring & Summer)." },
  { question: "Can fertilizer be used for indoor plants?", answer: "Yes, but use mild liquid or organic fertilizers in diluted form to avoid nutrient buildup." },
  { question: "What happens if plants are over-fertilized?", answer: "Over-fertilizing can lead to 'root burn', yellowing leaves, and stunted growth." },
  { question: "Which fertilizer is best for flowering plants?", answer: "Phosphorus-rich fertilizers (like Rose Boosters or Bone Meal) help improve bloom quality." },
  { question: "Is organic fertilizer safe for pets?", answer: "Yes, most organic fertilizers like Vermicompost are safe, but keep pets away during application." },
];

export default function Fertilizer() {
  const { addToCart, addToWishlist, wishlist } = useCart();
  const [currentPage, setCurrentPage] = useState(1);
  const [openFAQ, setOpenFAQ] = useState(null);
  const itemsPerPage = 12;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = fertilizersData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(fertilizersData.length / itemsPerPage);

  return (
    <div className="fertilizer-page">
      <div className="breadcrumb">Home / Fertilizers</div>
      <div className="plants-banner"><video src="/fertilizer/bannervideo.mp4" autoPlay loop muted></video></div>

      <div className="fert-header">
        <h2>Nourish Your Plants</h2>
        <div className="fert-controls">
          <button className="fert-filter-btn">Filter</button>
          <select className="fert-sort-select">
            <option>Featured</option>
            <option>Best selling</option>
            <option>Price, low to high</option>
            <option>Price, high to low</option>
          </select>
        </div>
      </div>

      <div className="fert-grid">
        {currentItems.map((item) => {
          const isWishlisted = wishlist?.some(fav => fav.id === item.id);
          return (
            <div key={item.id} className="fert-card">
              {item.tag && <span className="tag">{item.tag}</span>}
              
              <div className="image-box">
                <div className="wishlist-icon-inside" onClick={() => addToWishlist(item)}>
                  {isWishlisted ? <FaHeart color="red" /> : <FaRegHeart color="white" />}
                </div>
                
                <Link to={`/fert-detail/${item.id}`}>
                  <img src={item.img1} className="img-front" alt={item.name} />
                  <img src={item.img2} className="img-hover" alt={item.name} />
                </Link>
              </div>

              <Link to={`/fert-detail/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <h4 className="hover-green">{item.name}</h4>
              </Link>

              <div className="fert-rating">
                {[...Array(5)].map((_, index) => (
                  <span key={index} style={{ color: index < item.rating ? "#FFD700" : "#ccc" }}>★</span>
                ))}
              </div>

              <div className="price">₹ {item.price} <span>₹ {item.oldPrice}</span></div>
              
              <button className="cart-btn" onClick={() => addToCart({ ...item, quantity: 1 })}>
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

      <section className="fert-content">
        <h3>Essential Nutrition: Why Your Plants Need Fertilizer</h3>
        <p>1. Fertilizers act as a multivitamin for your plants, providing essential nitrogen, phosphorus, and potassium.</p>
        <p>2. Organic vermicompost improves soil structure and increases water retention for healthier root systems.</p>
        <p>3. Liquid fertilizers are fast-acting as they are absorbed directly through the roots and leaves of the plant.</p>
        <p>4. Using bone meal is a great way to provide a slow-release source of phosphorus for beautiful flower blooms.</p>
        <p>5. Seaweed extract fertilizers contain trace minerals that help plants build immunity against pests and diseases.</p>
        <p>6. Always water your plants before applying granular fertilizer to prevent the concentrated nutrients from burning roots.</p>
        <p>7. Balanced NPK fertilizers (like 19-19-19) are perfect for general garden maintenance and leafy growth.</p>
        <p>8. Succulents and cacti require specialized low-nitrogen fertilizers to prevent weak and leggy growth patterns.</p>
        <p>9. Over-fertilizing can be more harmful than under-fertilizing; always follow the recommended dosage on the pack.</p>
        <p>10. Properly nourished plants are more resilient to extreme weather conditions and produce higher fruit yields.</p>
      </section>

      <div className="fert-faqs">
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