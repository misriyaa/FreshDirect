import React from 'react'
import { NavLink } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="main-footer">
      <div className="footer-container">
        
        {/* Column 1: Brand Info */}
        <div className="footer-column brand-info-col">
          <NavLink to="/" className="footer-brand">
            <img src="/favicon.png" alt="FreshDirect Logo" className="footer-logo" />
            <span className="footer-brand-name">FreshDirect</span>
          </NavLink>
          <p className="footer-brand-desc">
            Bringing nature's finest directly to your kitchen. We deliver fresh, sustainably sourced organic fruits and vegetables straight from local farms to your community.
          </p>
          <div className="social-links">
            <a href="#" aria-label="Facebook" className="social-icon-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="#" aria-label="Instagram" className="social-icon-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="#" aria-label="Twitter" className="social-icon-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-column">
          <h4 className="footer-title">Quick Links</h4>
          <ul className="footer-links-list">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/all-products">All Products</NavLink></li>
            <li><NavLink to="/shop">Shop Collection</NavLink></li>
            <li><NavLink to="/contact">Contact Us</NavLink></li>
          </ul>
        </div>

        {/* Column 3: Customer Services */}
        <div className="footer-column">
          <h4 className="footer-title">Our Services</h4>
          <ul className="footer-links-list">
            <li><NavLink to="/my-orders">Track My Order</NavLink></li>
            <li><a href="#faq">FAQs & Help</a></li>
            <li><a href="#shipping">Shipping & Returns</a></li>
            <li><a href="#privacy">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Column 4: Newsletter Subscription */}
        <div className="footer-column newsletter-col">
          <h4 className="footer-title">Stay Updated</h4>
          <p className="newsletter-text">Subscribe to receive exclusive harvest updates, seasonal discount offers, and fresh organic recipes.</p>
          <form className="footer-newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Your email address" 
              className="newsletter-input" 
              required 
            />
            <button type="submit" className="newsletter-btn" aria-label="Subscribe">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </form>
        </div>

      </div>

      {/* Bottom Copyright Guard Section */}
      <div className="footer-bottom-bar">
        <div className="footer-bottom-container">
          <p className="copyright-text">
            &copy; {currentYear} FreshDirect. All rights reserved.
          </p>
          <div className="payment-gateways">
            <span>Secure Payments:</span>
            <div className="gateway-badges">
              {/* Clean abstract placeholder indicators for payment types */}
              <div className="badge-card">Visa</div>
              <div className="badge-card">MC</div>
              <div className="badge-card">Amex</div>
              <div className="badge-card">PayPal</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer