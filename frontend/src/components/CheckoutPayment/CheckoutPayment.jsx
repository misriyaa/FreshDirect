import React, { useState } from 'react';
import './CheckoutPayment.css';

const CheckoutPayment = ({ totalAmount, onPlaceOrder }) => {
  const [activePaymentTab, setActivePaymentTab] = useState('upi');

  return (
    <div className="checkout-pane-card animated-entry plain-padding">
      <div className="payment-panel-header">
        <h1 className="pane-heading">Choose payment method</h1>
        <p className="pane-subheading">Choose the payment method you prefer</p>
      </div>

      <h3 className="payment-section-inner-title">Payment Method Options</h3>
      
      <div className="nykaa-payment-split-deck">
        {/* Left Sidebar Menu */}
        <div className="payment-navbar-sidebar">
          <div className={`pay-nav-tab ${activePaymentTab === 'upi' ? 'active' : ''}`} onClick={() => setActivePaymentTab('upi')}>
            <div className="tab-icon-frame upi-icon-color" />
            <div className="tab-label-stack"><strong>UPI</strong><span>Pay by any UPI app</span></div>
          </div>

          <div className={`pay-nav-tab ${activePaymentTab === 'card' ? 'active' : ''}`} onClick={() => setActivePaymentTab('card')}>
            <div className="tab-icon-frame card-icon-color" />
            <div className="tab-label-stack"><strong>Credit/Debit Card</strong><span>Visa, Mastercard & more</span></div>
          </div>

          <div className={`pay-nav-tab ${activePaymentTab === 'cod' ? 'active' : ''}`} onClick={() => setActivePaymentTab('cod')}>
            <div className="tab-icon-frame cod-icon-color" />
            <div className="tab-label-stack"><strong>Cash on delivery</strong><span>Pay at your doorstep</span></div>
          </div>

          <div className={`pay-nav-tab ${activePaymentTab === 'netbanking' ? 'active' : ''}`} onClick={() => setActivePaymentTab('netbanking')}>
            <div className="tab-icon-frame net-icon-color" />
            <div className="tab-label-stack"><strong>NetBanking</strong><span>Pay through preferred bank</span></div>
          </div>
        </div>

        {/* Right Active Details Panel Layout Views */}
        <div className="payment-panes-viewport-display">
          
          {activePaymentTab === 'upi' && (
            <div className="upi-pane-view animated-entry">
              <h3>Pay with UPI</h3>
              <hr className="pane-content-divider" />
              <div className="qr-code-display-box-wrapper">
                <div className="qr-header-row">
                  <strong>Scan QR Code</strong>
                  <div className="checkmark-pink-bubble">✓</div>
                </div>
                <div className="qr-mockup-body">
                  <div className="qr-matrix-square">
                    <div className="qr-corner" /><div className="qr-corner" /><div className="qr-corner" />
                  </div>
                  <div className="qr-meta-branding">
                    <span className="qr-instructions">Use any UPI app on your phone</span>
                    <div className="upi-logos-row-strip">
                      <span className="logo-badge gpay">GPay</span>
                      <span className="logo-badge phonepe">PhonePe</span>
                      <span className="logo-badge paytm">Paytm</span>
                    </div>
                  </div>
                </div>
              </div>
              <button className="nykaa-final-checkout-btn" onClick={() => onPlaceOrder('upi')}>Scan & Pay ₹{totalAmount}</button>
            </div>
          )}

          {activePaymentTab === 'card' && (
            <div className="card-pane-view animated-entry">
              <h3>Credit / Debit Card</h3>
              <hr className="pane-content-divider" />
              <div className="card-form-mock">
                <input type="text" placeholder="Card Number" className="pane-input" />
                <div className="form-group-row">
                  <input type="text" placeholder="Expiry Date (MM/YY)" className="pane-input" />
                  <input type="password" placeholder="CVV" className="pane-input" />
                </div>
                <input type="text" placeholder="Name on Card" className="pane-input" />
              </div>
              <button className="nykaa-final-checkout-btn" onClick={() => onPlaceOrder('card')}>Pay ₹{totalAmount} Now</button>
            </div>
          )}

          {activePaymentTab === 'cod' && (
            <div className="cod-pane-view animated-entry">
              <h3>Cash on Delivery</h3>
              <hr className="pane-content-divider" />
              <p className="cod-notice-text">Pay via cash or digital links when the carrier reaches your doorstep.</p>
              <button className="nykaa-final-checkout-btn" onClick={() => onPlaceOrder('cod')}>Confirm Cash Order (₹{totalAmount})</button>
            </div>
          )}

          {activePaymentTab === 'netbanking' && (
            <div className="netbanking-pane-view animated-entry">
              <h3>NetBanking Options</h3>
              <hr className="pane-content-divider" />
              <select className="pane-select-input">
                <option>Choose your bank</option>
                <option>State Bank of India</option>
                <option>HDFC Bank</option>
                <option>ICICI Bank</option>
              </select>
              <button className="nykaa-final-checkout-btn" onClick={() => onPlaceOrder('netbanking')}>Proceed to Bank Portal</button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default CheckoutPayment;