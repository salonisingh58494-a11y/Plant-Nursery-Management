import React from "react";
import "./LearnMore.css";

export default function LearnMore() {
  return (
    <section className="learn-more">
      <h2 className="learn-title">Want to explore more?</h2>

      <div className="learn-grid">
        <div className="learn-card">
          <img
            src="\sunflowerseed2.avif"
            alt="Seeds"
            className="learn-img"
          />
          <div className="learn-text">
            <h3>Seeds</h3>
            <p>Explore high-quality natural seeds perfect for indoor & outdoor gardening.</p>
            <a href="/seeds" className="learn-link">View Seeds</a>
          </div>
        </div>
        <div className="learn-card">
          <img
            src="\fertiliser6.jpg"
            alt="Fertilizers"
            className="learn-img"
          />
          <div className="learn-text">
            <h3>Fertilizers</h3>
            <p>Nutrient-rich organic fertilizers to boost plant health and growth.</p>
            <a href="/fertilizer" className="learn-link">Explore Fertilizers</a>
          </div>
        </div>
        <div className="learn-card">
          <img
            src="\ceramic1.jpg"
            alt="Ceramic Pots"
            className="learn-img"
          />
          <div className="learn-text">
            <h3>Ceramic Pots</h3>
            <p>Premium ceramic pots designed to beautify your home space.</p>
            <a href="/pots" className="learn-link">Browse Pots</a>
          </div>
        </div>
        <div className="learn-card">
          <img
            src="\ornamental1.jpg"
            alt="Ornamental Plants"
            className="learn-img"
          />
          <div className="learn-text">
            <h3>Ornamental Plants</h3>
            <p>Handpicked ornamental plants to elevate your indoor aesthetics.</p>
            <a href="/plants" className="learn-link">See Plants</a>
          </div>
        </div>

      </div>
    </section>
  );
}
