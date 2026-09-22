import React from "react";
import "./TrustBar.css";
import { FaSeedling, FaHandsHelping, FaStar } from "react-icons/fa";

export default function TrustBar() {
  return (
    <section className="trust-bar">
      <div className="trust-item">
        <FaSeedling className="trust-icon" />
        <p>14-days Replacement</p>
      </div>

      <div className="trust-item">
        <FaHandsHelping className="trust-icon" />
        <p>Expert Care Guidance</p>
      </div>

      <div className="trust-item">
        <FaStar className="trust-icon" />
        <p>
          <strong>10L+</strong> <br />
          Plant Parents Trust Us
        </p>
      </div>
    </section>
  );
}
