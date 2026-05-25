import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAppContext } from "../../context/AppContext";
import "./Login.css";

const Login = ({ isOpen, onClose }) => {
 const { loginUser, navigate } = useAppContext();

  // New state tracking whether the modal is in 'signin' or 'signup' mode
  const [authMode, setAuthMode] = useState("signin");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Prevent background scrolling when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Reset internal form inputs whenever the modal opens or closes
  useEffect(() => {
    setName("");
    setEmail("");
    setPassword("");
    setAuthMode("signin");
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const endpoint = authMode === "signin" ? "login" : "register";

      const payload =
        authMode === "signin"
          ? {
              email,
              password,
            }
          : {
              name,
              email,
              password,
            };

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/${endpoint}`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(payload),
        },
      );

      const data = await response.json();

      if (!data.success) {
        toast.error(data.message);

        return;
      }

      // Save token
loginUser(data.user, data.token);

      toast.success(
        authMode === "signin" ? "Login successful!" : "Account created!",
      );

      onClose();

      navigate("/");
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong");
    }
  };

  return (
    <>
      {/* Darkened Blur Background Shroud */}
      <div className="login-modal-overlay" onClick={onClose} />

      {/* Screen-Centered Compact Container Box */}
      <div className="login-modal-box">
        {/* Core Close Trigger Button */}
        <button
          className="login-modal-close-btn"
          onClick={onClose}
          aria-label="Close authentication window"
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
              d="M18 6L6 18M6 6l12 12"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="login-modal-header">
          <div className="login-modal-logo-row">
            <img
              src="/favicon.png"
              alt="FreshDirect Logo"
              className="login-modal-logo"
            />
            <span>FreshDirect</span>
          </div>
          <h1 className="login-modal-title">
            {authMode === "signin" ? "Sign In" : "Create Account"}
          </h1>
          <p className="login-modal-subtitle">
            {authMode === "signin"
              ? "Welcome back! Please enter your account credentials."
              : "Join us today to get fresh organic produce delivered to your doorstep."}
          </p>
        </div>

        <form className="login-modal-form" onSubmit={handleSubmit}>
          {/* DYNAMIC FIELD: Revealed exclusively during Sign Up mode */}
          {authMode === "signup" && (
            <div className="modal-input-group signup-animated-field">
              <label htmlFor="modal-name">Full Name</label>
              <input
                type="text"
                id="modal-name"
                placeholder="Alex Mercer"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                required
              />
            </div>
          )}

          {/* Email input field */}
          <div className="modal-input-group">
            <label htmlFor="modal-email">Email Address</label>
            <input
              type="email"
              id="modal-email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          {/* Password input field */}
          <div className="modal-input-group">
            <div className="modal-password-label-row">
              <label htmlFor="modal-password">Password</label>
              {authMode === "signin" && (
                <a href="#forgot" className="modal-forgot-link">
                  Forgot?
                </a>
              )}
            </div>
            <div className="modal-password-field-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="modal-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={
                  authMode === "signin" ? "current-password" : "new-password"
                }
                required
              />
              <button
                type="button"
                className="modal-password-eye-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 19c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button type="submit" className="login-modal-submit-btn">
            {authMode === "signin" ? "Sign In" : "Register Now"}
          </button>
        </form>

        {/* Modal Toggling Footer Handles */}
        <div className="login-modal-footer">
          {authMode === "signin" ? (
            <p>
              New to our fields?{" "}
              <span
                className="modal-register-hook"
                onClick={() => setAuthMode("signup")}
              >
                Create an account
              </span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span
                className="modal-register-hook"
                onClick={() => setAuthMode("signin")}
              >
                Sign In instead
              </span>
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
