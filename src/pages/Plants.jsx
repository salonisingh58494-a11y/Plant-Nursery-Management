import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./Plants.css";
import { useCart } from "../context/CartContext";

const plantNames = [
  "Oxycardium Green Plant with Moss Stick", "Money Plant Golden Pothos", "Snake Plant Laurentii", "Peace Lily Indoor Plant", "Areca Palm Air Purifier", "Rubber Plant Dark Green", "ZZ Plant Zamioculcas", "Aloe Vera Medicinal Plant", "Jade Plant Crassula", "Bamboo Palm Indoor Plant", "Fiddle Leaf Fig Plant", "Spider Plant Chlorophytum", "Aglaonema Pink Beauty", "Monstera Deliciosa", "Lucky Bamboo Plant", "Croton Petra Plant", "Anthurium Red Flower", "Calathea Orbifolia", "Philodendron Heartleaf", "Dracaena Marginata", "Boston Fern Hanging Plant", "Chinese Evergreen Plant", "Dieffenbachia Dumb Cane", "Kalanchoe Flowering Plant", "Pilea Peperomioides", "Syngonium Arrowhead Plant", "Peperomia Green Plant", "Begonia Rex Plant", "Schefflera Umbrella Plant", "Cactus Mix Indoor Plants", "Succulent Combo Set", "Orchid Phalaenopsis Plant", "Rosemary Herb Plant", "Mint Herb Indoor Plant", "Lavender Aromatic Plant", "Tulsi Holy Basil Plant",
];

const plantsData = plantNames.map((name, i) => {
  const dynamicPrice = 299 + (i * 45) % 1000;
  const dynamicOldPrice = dynamicPrice + 200;
  const dynamicRating = (i % 3 === 0) ? 5 : (i % 2 === 0) ? 4 : 3;
  return {
    id: `507f1f77bcf86cd7994390${(i + 1).toString().padStart(2, '0')}`,
    name,
    price: dynamicPrice,
    oldPrice: dynamicOldPrice,
    rating: dynamicRating,
    category: "Plants",
    tag: i % 3 === 0 ? "33% OFF" : i % 4 === 0 ? "Selling Out Fast!" : "",
    img1: `/plants/plant-${i + 1}.jpg`,
    img2: `/plants/plant-${i + 1}-hover.jpg`,
  };
});

const faqs = [
  { question: "Why are my houseplants getting brown tips on their leaves?", answer: "Brown tips often occur due to overwatering, underwatering, or low humidity." },
  { question: "How do I use the self-watering pot?", answer: "Fill the reservoir at the base, and the plant will draw water as needed." },
  { question: "Why is my plant not growing?", answer: "Ensure proper sunlight, watering, and nutrition. Fertilize periodically." },
  { question: "Why is my plant not flowering?", answer: "Flowering depends on plant type, light exposure, and nutrient levels." },
  { question: "How do I take care of succulents?", answer: "Succulents need bright light, well-draining soil, and minimal watering." },
];

export default function Plants() {
  const { addToCart, addToWishlist, wishlist } = useCart();
  const [currentPage, setCurrentPage] = useState(1);
  const [openFAQ, setOpenFAQ] = useState(null);
  const plantsPerPage = 12;

  const indexOfLastPlant = currentPage * plantsPerPage;
  const indexOfFirstPlant = indexOfLastPlant - plantsPerPage;
  const currentPlants = plantsData.slice(indexOfFirstPlant, indexOfLastPlant);
  const totalPages = Math.ceil(plantsData.length / plantsPerPage);

  return (
    <div className="plants-page">
      <div className="breadcrumb">Home / Plants</div>
      <div className="plants-banner"><video src="/plants/bannervideo.mp4" autoPlay loop muted></video></div>

      <div className="plants-header">
        <h2>Bring Nature Home</h2>
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

      <div className="plants-grid">
        {currentPlants.map((plant) => {
          const isWishlisted = wishlist?.some(item => item.id === plant.id);
          return (
            <div key={plant.id} className="plant-card">
              {plant.tag && <span className="tag">{plant.tag}</span>}
              <div className="image-box">
                <div className="wishlist-icon-inside" onClick={() => addToWishlist(plant)}>
                  {isWishlisted ? <FaHeart color="red" /> : <FaRegHeart color="white" />}
                </div>
                <Link to={`/product/${plant.id}`}>
                  <img src={plant.img1} className="img-front" alt={plant.name} />
                  <img src={plant.img2} className="img-hover" alt={plant.name} />
                </Link>
              </div>
              <Link to={`/product/${plant.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <h4 className="hover-green">{plant.name}</h4>
              </Link>
              <div className="plant-rating">
                {[...Array(5)].map((_, index) => (
                  <span key={index} style={{ color: index < plant.rating ? "#FFD700" : "#ccc" }}>★</span>
                ))}
              </div>
              <div className="price">₹ {plant.price} <span>₹ {plant.oldPrice}</span></div>
              <button className="cart-btn" onClick={() => addToCart(plant)}>ADD TO CART</button>
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

      {/* 💡 10 LINE CONTENT SECTION FIX */}
      <section className="plant-content" style={{lineHeight: '1.8', marginTop: '40px'}}>
        <h3>Plant Growing Tips for a Thriving Home Garden</h3>
        <p>1. Growing plants from seeds is a rewarding experience that connects you with nature directly.</p>
        <p>2. Always choose a pot with proper drainage holes to prevent root rot and ensure plant health.</p>
        <p>3. Watering should be done early in the morning so the soil stays moist throughout the day.</p>
        <p>4. Different plants require different sunlight; research your plant's specific light needs carefully.</p>
        <p>5. Use organic fertilizers every month during the growing season to boost your plant's immunity.</p>
        <p>6. Pruning dead leaves is essential as it helps the plant focus energy on new, healthy growth.</p>
        <p>7. Indoor plants improve air quality by filtering toxins and increasing oxygen levels in your room.</p>
        <p>8. Repot your plants every 12-18 months to give the roots more space to expand and breathe.</p>
        <p>9. Keep an eye out for pests like aphids or spider mites and treat them early with neem oil.</p>
        <p>10. Most importantly, talk to your plants and be patient, as gardening is a journey of love and care.</p>
      </section>

      <div className="plants-faqs">
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