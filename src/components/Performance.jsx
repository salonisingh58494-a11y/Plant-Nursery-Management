import React, { useEffect, useState } from "react";
import "./Performance.css";

const slider1Images = [
  "/perf1-1.webp",
  "/perf1-2.webp",
  "/perf1-3.jpg",
];

const slider2Images = [
  "/perf2-1.avif",
  "/perf2-2.jpg",
  "/perf2-3.jpg",
];

export default function Performance() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slider1Images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="performance">
      <div className="perf-wrapper">

        {/* CARD 1 */}
        <div className="perf-card">
          <div
            className="perf-img-slider"
            style={{ backgroundImage: `url(${slider1Images[index]})` }}
          ></div>

          <div className="perf-content">
            <h3>Plant Subscriptions</h3>
            <p>
              Receive a curated box of handpicked plants, packaged with care,
              every month.
            </p>
            <button className="perf-btn">Start Saving</button>
          </div>
        </div>

        {/* CARD 2 */}
        <div className="perf-card">
          <div
            className="perf-img-slider"
            style={{ backgroundImage: `url(${slider2Images[index]})` }}
          ></div>

          <div className="perf-content">
            <h3>Join our Plant Parent Rewards Club</h3>
            <p>Earn coins and redeem them for exclusive discounts.</p>
            <button className="perf-btn">Refer a Friend</button>
          </div>
        </div>

      </div>
    </section>
  );
}
