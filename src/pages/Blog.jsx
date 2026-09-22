import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiPlay, FiSearch, FiArrowRight, FiVideo } from "react-icons/fi";
import "./Blog.css";

export default function BlogPage() {
  const [search, setSearch] = useState("");

  useEffect(() => {
    const items = document.querySelectorAll(".blog-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.1 }
    );
    items.forEach((item) => observer.observe(item));
  }, []);

  const blogData = [
    {
      id: 1,
      type: "video",
      videoUrl: "plants/blogbanner.mp4", 
      thumbnail: "../green.jpg",
      category: "GREEN LIFESTYLE",
      title: "10 Auspicious plants to bring home this Diwali",
      desc: "Diwali is the festival of lights and fresh beginnings. Learn which plants invite prosperity...",
      date: "Sept 15, 2025"
    },
    {
      id: 2,
      type: "image",
      img: "plants/Jackie-Shroff.webp",
      category: "GARDENING BASICS",
      title: "Jackie Shroff & Mission for a Greener India",
      desc: "Bollywood’s beloved 'Bhidu' shares his passion for nature and plantation drives...",
      date: "Aug 25, 2025"
    },
    {
      id: 3,
      type: "video",
      videoUrl: "plants/blogbanner1.mp4",
      thumbnail: "../pot5.webp",
      category: "MAINTENANCE",
      title: "Ultimate Guide to Buying Decorative Pots",
      desc: "Choosing the right pot is as important as the plant itself. Watch our expert guide...",
      date: "July 10, 2025"
    }
  ];

  return (
    <div className="blog-wrapper">
      
      <section className="blog-hero">
        <div className="hero-content blog-reveal">
          <span className="hero-badge">OUR JOURNAL</span>
          <h1>Greening Your <span>Life</span> One Blog at a Time</h1>
          <p>Discover expert tips, video tutorials, and sustainable lifestyle guides.</p>
          
          <div className="hero-search">
            <FiSearch className="s-icon" />
            <input 
              type="text" 
              placeholder="Search gardening tips..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button>Search</button>
          </div>
        </div>
      </section>

      <section className="promo-banner blog-reveal">
        <div className="promo-glass">
          <div className="promo-text">
            <h4>FESTIVE SEASON OFFER</h4>
            <h2>FLAT 60% OFF + FREE GIFT</h2>
            <p>On all gardening kits above ₹1499</p>
          </div>
          <div className="promo-code">
            <span>USE CODE</span>
            <strong>GARDEN60</strong>
          </div>
        </div>
      </section>

      <section className="blog-container">
        <div className="blog-main-content">
          <h2 className="section-title">Latest Stories</h2>
          <div className="blog-grid-modern">
            {blogData.map((blog) => (
              <div key={blog.id} className="modern-card blog-reveal">
                <div className="card-media">
                  {blog.type === "video" ? (
                    <div className="video-wrapper">
                      <video muted loop onMouseEnter={e => e.target.play()} onMouseLeave={e => {e.target.pause(); e.target.currentTime=0}}>
                        <source src={blog.videoUrl} type="video/mp4" />
                      </video>
                      <div className="video-overlay">
                        <FiPlay className="play-btn" />
                        <span className="video-tag"><FiVideo /> VIDEO</span>
                      </div>
                    </div>
                  ) : (
                    <img src={blog.img} alt={blog.title} />
                  )}
                  <span className="category-tag">{blog.category}</span>
                </div>
                
                <div className="card-body">
                  <span className="post-date">{blog.date}</span>
                  <h3>{blog.title}</h3>
                  <p>{blog.desc}</p>
                  <Link to="/blog-detail" className="read-link">
                    Read Story <FiArrowRight />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="blog-sidebar blog-reveal">
          <div className="sidebar-box">
            <h3>Categories</h3>
            <ul className="cat-list">
              <li>Gardening Basics <span>12</span></li>
              <li>Kitchen Garden <span>08</span></li>
              <li>Ornamental <span>15</span></li>
              <li>Green Lifestyle <span>22</span></li>
            </ul>
          </div>

          <div className="sidebar-box popular-posts">
            <h3>Trending Now</h3>
            <div className="trend-item">
              <img src="../tulip.webp" alt="" />
              <div>
                <h4>Best Summer Seeds</h4>
                <span>5 mins read</span>
              </div>
            </div>
            <div className="trend-item">
              <img src="../tools.jpg" alt="" />
              <div>
                <h4>Tool Maintenance</h4>
                <span>8 mins read</span>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}