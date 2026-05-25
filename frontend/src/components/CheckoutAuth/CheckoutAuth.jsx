import React from 'react';
import './CheckoutAuth.css';

const CheckoutAuth = ({ onOpenLogin }) => {
  return (
    <div className="checkout-pane-card animated-entry">
      <div className="embedded-auth-header">
        <h1 className="pane-heading">Account Authentication</h1>
        <p className="pane-subheading">
          Please log in or create an account to securely save your address details and continue to payment.
        </p>
      </div>

      <div className="embedded-action-pane">
        <div className="checkout-login-prompt-box">
          <div className="prompt-illustration-badge">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3>Access Saved Addresses & Farm Rewards</h3>
          <p>
            Logging in allows you to automatically access your saved delivery locations, manage checkout securely, and track your harvest orders.
          </p>
        </div>
        
        {/* Opens your existing Login popup modal completely intact */}
        <button className="embedded-auth-trigger-action-btn" onClick={onOpenLogin}>
          Sign In / Register Now
        </button>
      </div>
    </div>
  );
};

export default CheckoutAuth;