import React, { useState } from "react";
import { useAppContext } from "../../../context/AppContext";
import { toast } from "react-toastify";
import './SellerLogin.css';

function SellerLogin() {
  const { setUser, setisSeller, navigate } = useAppContext();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [shopName, setShopName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password || (isRegistering && !shopName)) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (isRegistering) {
      toast.success(`Welcome, ${shopName}! Your merchant portal is active.`);
    } else {
      toast.success("Welcome back to your Vendor Command Center.");
    }

    setUser({
      email,
      role: "seller",
      shopName: isRegistering ? shopName : "Fresh Market Vendor Co."
    });

    setisSeller(true); 
    navigate("/seller/dashboard");
  };

  return (
    <div className="seller-auth-container">
      <div className="seller-auth-backdrop-glow"></div>
      
      <div className="seller-auth-card">
        <div className="seller-auth-header">
          <h2>{isRegistering ? "Merchant Registration" : "Vendor Portal"}</h2>
          <p>
            {isRegistering 
              ? "Register your shop to start selling fresh produce worldwide." 
              : "Access your dashboard, manage inventory, and fulfill live orders."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="seller-auth-form">
          {isRegistering && (
            <div className="form-group">
              <label htmlFor="shopName">Shop / Vendor Name</label>
              <input
                type="text"
                id="shopName"
                placeholder="e.g., GreenGrocer Organics"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="sellerEmail">Registered Email</label>
            <input
              type="email"
              id="sellerEmail"
              placeholder="vendor@market.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="sellerPassword">Security Password</label>
            <input
              type="password"
              id="sellerPassword"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {!isRegistering && (
            <div className="forgot-password-link">
              <span onClick={() => toast.info("Password reset link sent to registered device.")}>
                Forgot security key?
              </span>
            </div>
          )}

          <button type="submit" className="seller-submit-btn">
            {isRegistering ? "Deploy Storefront" : "Authenticate Account"}
          </button>
        </form>

        <div className="seller-auth-footer">
          <p>
            {isRegistering ? "Already managing a store?" : "Want to launch a new patch?"}{" "}
            <span onClick={() => setIsRegistering(!isRegistering)}>
              {isRegistering ? "Sign In Here" : "Create Seller Account"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SellerLogin;