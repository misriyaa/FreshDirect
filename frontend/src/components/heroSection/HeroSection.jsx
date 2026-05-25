import React, { useState, useEffect } from "react";
import "./heroSection.css";
import { useAppContext } from "../../context/AppContext";
import heroBg from "../../assets/herosection.png";
import heroBgMobile from "../../assets/herosectionmobile.png";

const HeroSection = () => {
  const { navigate } = useAppContext();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="hero-section">

      {/* Background Image */}
      <div
        className="hero-background-image"
        style={{
          backgroundImage: `url(${isMobile ? heroBgMobile : heroBg})`,
        }}
      ></div>

      {/* Content */}
      <div className="hero-container">
        <div className="hero-content-left">

          <div className="badge-tag">
            Fresh Organic Fruits & Vegetables
          </div>

          <h1 className="hero-title">
            Fresh Food <br />
            <span>Delivered Daily</span>
          </h1>

          <p className="hero-description">
            Experience premium quality organic fruits and farm-fresh vegetables
            delivered directly to your doorstep with speed, freshness, and care.
          </p>

          <div className="hero-cta-group">
            <button
              className="btn-solid"
              onClick={() => navigate("/all-products")}
            >
              Shop Now
              <span className="btn-icon">➜</span>
            </button>

            <button
              className="btn-outline"
              onClick={() => navigate("/all-products")}
            >
              Explore Products
              <span className="btn-icon-gold">➜</span>
            </button>
          </div>

        </div>
      </div>

    </header>
  );
};

export default HeroSection;