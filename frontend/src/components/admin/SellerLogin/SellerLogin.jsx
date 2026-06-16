import React, { useState } from "react";
import { useAppContext } from "../../../context/AppContext";
import { toast } from "react-toastify";
import "./SellerLogin.css";

function SellerLogin() {
  const { setUser, setisSeller, navigate, loginUser } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [shopName, setShopName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || (isRegistering && !shopName)) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      // Direct variable mapping pointing cleanly to your Express backend base path
      const apiEndpoint = isRegistering
        ? `${import.meta.env.VITE_BACKEND_URL}/api/seller/register`
        : `${import.meta.env.VITE_BACKEND_URL}/api/seller/login`;

      const requestPayload = isRegistering
        ? { shopName, email, password }
        : { email, password };

      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestPayload),
      });

      const data = await response.json();

      if (data.success) {
        loginUser(data.seller, data.token);

        toast.success(
          isRegistering
            ? `Welcome, ${data.seller.shopName}! Your merchant portal is active.`
            : "Welcome back to your Vendor Command Center.",
        );

        // Advance layout directly to the secure dashboard grid view area
        navigate("/seller/dashboard");
      } else {
        toast.error(data.message || "Authentication routine interrupted.");
      }
    } catch (error) {
      console.error("Pipeline connectivity failure tracking:", error);
      toast.error("Could not communicate with secure data clusters.");
    }
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
              <span
                onClick={() =>
                  toast.info("Password reset tracking parameters dispatched.")
                }
              >
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
            {isRegistering
              ? "Already managing a store?"
              : "Want to launch a new patch?"}{" "}
            <span
              onClick={() => {
                setIsRegistering(!isRegistering);
                setShopName("");
                setEmail("");
                setPassword("");
              }}
            >
              {isRegistering ? "Sign In Here" : "Create Seller Account"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SellerLogin;
