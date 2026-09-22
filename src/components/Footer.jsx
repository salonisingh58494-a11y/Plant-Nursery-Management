import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">

      {/* TOP STRIP */}
      <div className="footer-top">
        {Array(4).fill().map((_, i) => (
          <div className="top-item" key={i}>
            <span className="leaf"></span>
            <span>🪴Stay Rooted</span>
          </div>
        ))}
      </div>
      <div className="footer-content">

        <div className="footer-col">
          <h4>ABOUT US</h4>
          <p>Our Story</p>
          <p>Contact Us</p>
          <p>Careers</p>
          <p>Locate Stores</p>
          <p>Own Grown</p>
          <p>Garden Services & Maintenance</p>
        </div>

        <div className="footer-col">
          <h4>CUSTOMER CARE</h4>
          <p>Take The Plant Quiz</p>
          <p>Shipping Policy</p>
          <p>Terms and Conditions</p>
          <p>Privacy Policy</p>
          <p>Track Order</p>
          <p>FAQs</p>
          <p>Order Related Policy</p>
        </div>

        <div className="footer-col">
          <h4>OFFERS & REWARDS</h4>
          <p>Plant Parent Rewards Club</p>
          <p>Paryavaran Coupons</p>
        </div>

        <div className="footer-col">
          <h4>GET IN TOUCH</h4>
          <p><strong>WhatsApp us at:</strong> 7090970909</p>
          <p><strong>Call:</strong> +91-9129912991</p>
          <p><strong>Email:</strong> support@paryavaran.com</p>
        </div>

        <div className="footer-col newsletter">
          <h4>SIGN UP FOR OUR NEWSLETTER</h4>
          <div className="newsletter-box">
            <input type="email" placeholder="Enter email address" />
            <button>→</button>
          </div>
          <p className="newsletter-text">
            For plant care tips, our featured plant of the week,
            exclusive offers and discounts
          </p>

          <h4 className="follow">FOLLOW US</h4>
          <div className="socials">
            <span>f</span>
            <span>X</span>
            <span>📸</span>
            <span>in</span>
            <span>▶</span>
          </div>
        </div>

      </div>
      <div className="footer-bottom">
        © 2025, <span>Paryavaran</span>. All rights reserved.
      </div>

    </footer>
  );
}
