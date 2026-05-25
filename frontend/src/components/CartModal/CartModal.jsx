import React, { useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import "./CartModal.css";

const CartModal = ({ isOpen, onClose }) => {

  const {
    cart,
    addToCart,
    removeFromCart,
    clearFromCart,
    navigate,
  } = useAppContext();

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

  // Subtotal
  const subtotal =
    cart.reduce(
      (acc, item) =>
        acc + item.price * item.qty,
      0
    );

  // Total quantity
  const totalItemsCount =
    cart.reduce(
      (acc, item) =>
        acc + item.qty,
      0
    );

  return (
    <>
      <div
        className={`cart-modal-overlay ${
          isOpen ? "active" : ""
        }`}
        onClick={onClose}
      />

      <div
        className={`cart-drawer-panel ${
          isOpen ? "open" : ""
        }`}
      >

        {/* HEADER */}
        <div className="cart-drawer-header">

          <div className="header-title-box">

            <h2 className="drawer-title">
              Shopping Cart
            </h2>

            <span className="item-count-pill">
              {totalItemsCount} Items
            </span>

          </div>

          <button
            className="drawer-close-btn"
            onClick={onClose}
            aria-label="Close cart"
          >
            <svg
              width="24"
              height="24"
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

        </div>

        {/* CART ITEMS */}
        <div className="cart-drawer-items-list">

          {cart.length > 0 ? (

            cart.map((item) => (

              <div
                key={item._id}
                className="cart-item-row"
              >

                <img
                  src={item.img}
                  alt={item.name}
                  className="cart-item-img"
                />

                <div className="cart-item-meta">

                  <h4 className="cart-item-name">
                    {item.name}
                  </h4>

                  <span className="cart-item-unit-price">
                    ₹{item.price} / kg
                  </span>

                  {/* QTY */}
                  <div className="cart-qty-selector">

                    <button
                      className="qty-btn"
                      onClick={() =>
                        removeFromCart(item._id)
                      }
                    >
                      −
                    </button>

                    <span className="qty-value-text">
                      {item.qty}
                    </span>

                    <button
                      className="qty-btn"
                      onClick={() =>
                        addToCart(item)
                      }
                    >
                      +
                    </button>

                  </div>

                </div>

                {/* RIGHT */}
                <div className="cart-item-right-actions">

                  <span className="cart-item-total-price">
                    ₹{item.price * item.qty}
                  </span>

                  <button
                    className="cart-item-remove-btn"
                    onClick={() =>
                      clearFromCart(item._id)
                    }
                  >
                    Remove
                  </button>

                </div>

              </div>

            ))

          ) : (

            <div className="empty-cart-fallback">

              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="empty-cart-icon"
              >
                <path
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <p>
                Your shopping cart is currently empty.
              </p>

              <button
                className="continue-shopping-btn"
                onClick={onClose}
              >
                Continue Shopping
              </button>

            </div>

          )}

        </div>

        {/* FOOTER */}
        {cart.length > 0 && (

          <div className="cart-drawer-footer">

            <div className="tally-row">

              <span className="tally-label">
                Subtotal
              </span>

              <span className="tally-value-price">
                ₹{subtotal}
              </span>

            </div>

            <p className="footer-notice-text">
              Shipping charges and sales taxes
              are calculated at checkout.
            </p>

            <button
              className="checkout-action-btn"
              onClick={() => {

                onClose();

                navigate("/checkout");

              }}
            >
              Proceed to Checkout

              <span className="checkout-arrow-icon">
                ➔
              </span>

            </button>

          </div>

        )}

      </div>
    </>
  );
};

export default CartModal;