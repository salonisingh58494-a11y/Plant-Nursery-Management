import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Hero.css";

export default function Hero() {
  const slides = [
    {
      title: "Welcome to Paryavaran",
      highlight: "Hello!",
      text: "Your one-stop destination for plants, seeds, fertilizers & accessories.",
      btn: "Explore Plants",
      link: "/PlantsPage",
      img: "/Hero1.jpg",
      box1: "+500",
      box1text: "Happy Customers",
      box2: "+200",
      box2text: "Plant Varieties",
    },
    {
      title: "Grow Your Indoors",
      highlight: "Naturally",
      text: "Indoor plants that bring beauty and freshness to your home.",
      btn: "Shop Indoor Plants",
      link: "/IndoorPlants",
      img: "/Hero2.webp",
      box1: "+50",
      box1text: "Air-Purifying Plants",
      box2: "+100",
      box2text: "Low-maintenance Plants",
    },
    {
      title: "Fertilizers for Better Growth",
      highlight: "Organic",
      text: "Boost your plant's growth with our natural fertilizers.",
      btn: "Buy Fertilizers",
      link: "/FertilizerPage",
      img: "/Hero3.jpg",
      box1: "100%",
      box1text: "Organic Products",
      box2: "+300",
      box2text: "Garden Essentials",
    },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const slider = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 3500);

    return () => clearInterval(slider);
  }, []);

  return (
    <section className="hero-section">
      <div className="slides-wrapper">
        {slides.map((slide, i) => (
          <div key={i} className={`slide ${index === i ? "active-slide" : ""}`}>
            {/* LEFT */}
            <div className="slide-left">
              <h1>
                <span className="highlight">{slide.highlight}</span>
                <br />
                {slide.title}
              </h1>

              <p>{slide.text}</p>

              <Link to={slide.link} className="btn-primary">
                {slide.btn}
              </Link>

              <div className="stats-row">
                <div className="stat-box">
                  <h3>{slide.box1}</h3>
                  <p>{slide.box1text}</p>
                </div>
                <div className="stat-box">
                  <h3>{slide.box2}</h3>
                  <p>{slide.box2text}</p>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="slide-right">
              <img src={slide.img} alt={slide.title} className="float-img" />

              <div className="floating-box box1">
                <h3>{slide.box1}</h3>
                <p>{slide.box1text}</p>
              </div>

              <div className="floating-box box2">
                <h3>{slide.box2}</h3>
                <p>{slide.box2text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* DOTS */}
      <div className="slider-dots">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`dot ${index === i ? "active-dot" : ""}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </section>
  );
}
