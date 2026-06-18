import React, { useRef, useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { BACKEND_URL } from "../../config";
import "./BestSeller.css";

const BestSeller = () => {
  const bsCarouselRef = useRef(null);

  const [products, setProducts] = useState([]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${BACKEND_URL}/api/products`,
        );

        const data = await response.json();

        if (data.success) {
          // Only 7 products
          setProducts(data.products.slice(0, 7));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  // Scroll
  const handleScroll = (direction) => {
    if (bsCarouselRef.current) {
      const cardWidthAndGap = 320;

      if (direction === "left") {
        bsCarouselRef.current.scrollBy({
          left: -cardWidthAndGap,
          behavior: "smooth",
        });
      } else {
        bsCarouselRef.current.scrollBy({
          left: cardWidthAndGap,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <section className="bestseller-section">
      {/* Header */}
      <div className="bestseller-header">
        <div className="header-text-left">
          <span className="subtitle-tag">Customer Favorites</span>

          <h2 className="bestseller-title">Our Best Sellers</h2>

          <p className="bestseller-intro-desc">
            Our community's most-loved organic picks. Handpicked daily and
            delivered fresh.
          </p>
        </div>

        {/* Navigation */}
        <div className="bestseller-navigation">
          <button
            className="bs-nav-btn"
            onClick={() => handleScroll("left")}
            aria-label="Scroll left"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                d="M15 19l-7-7 7-7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            className="bs-nav-btn"
            onClick={() => handleScroll("right")}
            aria-label="Scroll right"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                d="M9 5l7 7-7 7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Products */}
      <div className="bestseller-carousel-track" ref={bsCarouselRef}>
        {products.map((item) => (
          <ProductCard key={item._id} product={item} />
        ))}
      </div>
    </section>
  );
};

export default BestSeller;
