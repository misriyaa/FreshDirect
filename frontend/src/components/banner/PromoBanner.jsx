import React from 'react'
import './PromoBanner.css'

const PromoBanner = () => {
  return (
    <section className="promo-banner-responsive">
      <div className="pbr-pattern-overlay" />

      <div className="pbr-container">

        {/* Heading — order:1 on mobile, order:3 on desktop */}
        <div className="pbr-heading-wrapper">
          <h2 className="pbr-main-heading">
            Healthy Life With
            <br />
            <span>Fresh Products</span>
          </h2>
        </div>

        {/* Picture frame — order:2 on mobile, order:4 on desktop */}
        <div className="pbr-image-frame">
          <img
            src="https://i1-e.pinimg.com/control1/1200x/3d/46/8d/3d468dc246143f52fff3514fcc49dc2b.jpg"
            alt="Farmer with fresh produce"
            className="pbr-display-img"
          />
        </div>

        {/* Reviews — order:3 on mobile, order:1 on desktop */}
        <div className="pbr-reviews-wrapper">
          <div className="pbr-avatar-stack">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop"
              alt="Client 1"
              className="pbr-avatar"
            />
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
              alt="Client 2"
              className="pbr-avatar"
            />
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
              alt="Client 3"
              className="pbr-avatar"
            />
          </div>
          <h3 className="pbr-text-reviews">
            100K+ Client With
            <br />
            <span>Positive Reviews</span>
          </h3>
        </div>

        {/* Circular rotating stamp — order:4 on mobile, order:2 on desktop */}
        <div className="pbr-stamp-wrapper">
          <div className="pbr-circular-stamp">
            <svg viewBox="0 0 100 100" className="pbr-rotating-svg">
              <path
                id="circlePathResponsive"
                d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                fill="transparent"
              />
              <text className="pbr-stamp-text">
                <textPath href="#circlePathResponsive" startOffset="0%">
                  • Vegetables • Agro • Organic • Farming
                </textPath>
              </text>
            </svg>
            <div className="pbr-stamp-center-arrow">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              >
                <path
                  d="M7 17L17 7M17 7H7M17 7V17"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default PromoBanner