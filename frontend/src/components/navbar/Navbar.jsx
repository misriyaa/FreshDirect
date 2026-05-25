import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import { useAppContext } from "../../context/AppContext";

const Navbar = ({ onCartClick, onLoginClick }) => {
  const [open, setOpen] = React.useState(false);

  const [profileDropdown, setProfileDropdown] =
    React.useState(false);

  const {
    user,
    setUser,
    navigate,
    searchQuery,
    setSearchQuery,
    cart,
  } = useAppContext();

  // Total cart items counter
  const totalCartItems = cart.reduce(
    (acc, item) => acc + item.qty,
    0
  );

  // Logout handler
  const logoOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setUser(null);

    setProfileDropdown(false);

    setOpen(false);

    navigate("/");
  };

  const getNavLinkClass = ({ isActive }) =>
    `nav-link ${isActive ? "active" : ""}`;

  // Auto navigate on search
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      navigate("/all-products");
    }
  }, [searchQuery, navigate]);

  return (
    <nav className="navbar">

      {/* LEFT */}

      <div className="nav-left">

        <NavLink
          to="/"
          className="nav-brand"
          onClick={() => setSearchQuery("")}
        >

          <img
            src="/favicon.png"
            alt="FreshDirect Logo"
            className="brand-logo"
          />

          <span className="brand-name">
            FreshDirect
          </span>

        </NavLink>

      </div>

      {/* CENTER */}

      <div className="nav-center">

        <div className="nav-links-desktop">

          <NavLink
            to="/"
            end
            className={getNavLinkClass}
            onClick={() => setSearchQuery("")}
          >
            Home
          </NavLink>

          <NavLink
            to="/all-products"
            className={getNavLinkClass}
          >
            Shop
          </NavLink>

          {user && (
            <NavLink
              to="/my-orders"
              className={getNavLinkClass}
            >
              My Orders
            </NavLink>
          )}

          <NavLink
            to="/contact"
            className={getNavLinkClass}
          >
            Contact
          </NavLink>

        </div>

      </div>

      {/* RIGHT */}

      <div className="nav-right">

        {/* DESKTOP SEARCH */}

        <div className="search-container">

          <input
            value={searchQuery}
            onChange={(e) =>
              setSearchQuery(e.target.value)
            }
            className="search-input"
            type="text"
            placeholder="Search products..."
          />

          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="search-icon"
          >
            <path
              d="M10.836 10.615 15 14.695"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <path
              clipRule="evenodd"
              d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

        </div>

        {/* DESKTOP CART */}

        <div
          className="cart-icon-container desktop-cart"
          onClick={onCartClick}
          role="button"
          tabIndex={0}
        >

          <svg
            width="22"
            height="22"
            viewBox="0 0 14 14"
            fill="none"
            className="cart-svg"
          >
            <path
              d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <span className="cart-badge">
            {totalCartItems}
          </span>

        </div>

        {/* AUTH */}

        <div className="desktop-auth">

          {!user ? (

            <button
              className="cta-button"
              onClick={onLoginClick}
            >
              Login
              <span className="cta-arrow">
                ➔
              </span>
            </button>

          ) : (

            <div className="profile-dropdown-container">

              <button
                className="profile-button"
                onClick={() =>
                  setProfileDropdown(
                    !profileDropdown
                  )
                }
              >

                {user?.name?.split(" ")[0]}

                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={`arrow-icon ${
                    profileDropdown
                      ? "rotate"
                      : ""
                  }`}
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>

              </button>

              {profileDropdown && (

                <div className="profile-menu">

                  <button
                    className="menu-item"
                    onClick={() => {
                      navigate("/my-orders");
                      setProfileDropdown(false);
                    }}
                  >
                    My Orders
                  </button>

                  <button
                    className="menu-item logout"
                    onClick={logoOut}
                  >
                    Logout
                  </button>

                </div>

              )}

            </div>

          )}

        </div>

        {/* MOBILE ACTIONS */}

        <div className="mobile-right-actions">

          {/* MOBILE SEARCH */}

          <div className="mobile-search-container">

            <input
              value={searchQuery}
              onChange={(e) =>
                setSearchQuery(e.target.value)
              }
              className="mobile-search-input"
              type="text"
              placeholder="Search"
            />

          </div>

          {/* MOBILE CART */}

          <div
            className="cart-icon-container mobile-cart-icon"
            onClick={onCartClick}
            role="button"
            tabIndex={0}
          >

            <svg
              width="22"
              height="22"
              viewBox="0 0 14 14"
              fill="none"
              className="cart-svg"
            >
              <path
                d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span className="cart-badge">
              {totalCartItems}
            </span>

          </div>

          {/* MOBILE MENU */}

          <button
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            className="mobile-menu-toggle"
          >

            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="burger-icon"
            >

              <path
                d={
                  open
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />

            </svg>

          </button>

        </div>

      </div>

      {/* MOBILE DRAWER */}

      <div
        className={`mobile-drawer ${
          open ? "open" : ""
        }`}
      >

        <NavLink
          to="/"
          end
          onClick={() => {
            setOpen(false);
            setSearchQuery("");
          }}
          className={getNavLinkClass}
        >
          Home
        </NavLink>

        <NavLink
          to="/all-products"
          onClick={() => setOpen(false)}
          className={getNavLinkClass}
        >
          Shop
        </NavLink>

        {user && (

          <NavLink
            to="/my-orders"
            onClick={() => setOpen(false)}
            className={getNavLinkClass}
          >
            My Orders
          </NavLink>

        )}

        <NavLink
          to="/contact"
          onClick={() => setOpen(false)}
          className={getNavLinkClass}
        >
          Contact
        </NavLink>

        <hr className="mobile-divider" />

        {!user ? (

          <button
            className="mobile-cta-button"
            onClick={() => {
              setOpen(false);
              onLoginClick();
            }}
          >
            Login
          </button>

        ) : (

          <button
            className="mobile-cta-button logout-btn"
            onClick={logoOut}
          >
            Logout
          </button>

        )}

      </div>

    </nav>
  );
};

export default Navbar;