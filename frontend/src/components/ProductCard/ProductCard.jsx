import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppContext } from "../../context/AppContext";
import "./ProductCard.css";

const ProductCard = ({ product }) => {

  const navigate = useNavigate();

  const [isFavorite, setIsFavorite] = useState(false);

  const {
    cart,
    addToCart,
    removeFromCart
  } = useAppContext();

  if (!product) return null;

  // ================= SAFE PRODUCT ID =================
  const productId = product._id || product.id;

  // ================= PRODUCT DATA =================
  const {
    name,
    category,
    description,
    price,
    offerPrice,
    image,
    img
  } = product;

  // ================= IMAGE =================
  const imageUrl =
    img ||
    (
      image
        ? image.startsWith("http")
          ? image
          :`${import.meta.env.VITE_BACKEND_URL}/${image}`
        : "https://via.placeholder.com/300"
    );

  // ================= CART =================
  const cartItem =
    cart.find(
      (item) =>
        (item._id || item.id) === productId
    );

  const currentQuantity =
    cartItem ? cartItem.qty : 0;

  // ================= OPEN DETAILS =================
  const handleOpenProduct = () => {

    if (!productId) {

      toast.error("Product ID missing");

      return;
    }

    navigate(`/product/${productId}`);
  };

  // ================= ADD =================
  const handleInitialAdd = (e) => {

    e.stopPropagation();

    addToCart({
      ...product,
      _id: productId,
      img: imageUrl,
    });

    toast.success(`${name} added to cart!`);
  };

  // ================= INCREMENT =================
  const handleIncrement = (e) => {

    e.stopPropagation();

    addToCart({
      ...product,
      _id: productId,
      img: imageUrl,
    });
  };

  // ================= DECREMENT =================
  const handleDecrement = (e) => {

    e.stopPropagation();

    if (currentQuantity === 1) {

      toast.info(`${name} removed from cart`);
    }

    removeFromCart(productId);
  };

  return (

    <div
      className="product-card"
      onClick={handleOpenProduct}
    >

      {/* TOP */}
      <div className="card-top-actions">

        <span className="offer-badge">
          {category}
        </span>

       

      </div>

      {/* IMAGE */}
      <div className="card-image-wrapper">

        <img
          src={imageUrl}
          alt={name}
          className="product-image"
        />

      </div>

      {/* DETAILS */}
      <div className="card-details">

        <span className="product-category">
          {category}
        </span>

        <h3 className="product-title">
          {name}
        </h3>

        <p className="product-description-text">
          {description}
        </p>

        {/* RATING */}
        <div className="product-rating">

          <div className="stars">

            {[...Array(5)].map((_, i) => (

              <svg
                key={i}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="#FFC000"
                stroke="#FFC000"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>

            ))}

          </div>

          <span className="review-count">
            (48)
          </span>

        </div>

        {/* FOOTER */}
        <div className="card-footer-row">

          <div className="price-box">

            <span className="current-price">
              ₹{offerPrice || price}
            </span>

            {offerPrice && (
              <span
                style={{
                  textDecoration: "line-through",
                  color: "#888",
                  marginLeft: "6px",
                  fontSize: "14px",
                }}
              >
                ₹{price}
              </span>
            )}

            <span className="unit-text">
              / kg
            </span>

          </div>

          {currentQuantity === 0 ? (

            <button
              className="add-to-cart-btn"
              onClick={handleInitialAdd}
            >
              Add
            </button>

          ) : (

            <div
              className="card-quantity-selector"
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              <button
                className="card-qty-btn decrease"
                onClick={handleDecrement}
              >
                −
              </button>

              <span className="card-qty-value">
                {currentQuantity}
              </span>

              <button
                className="card-qty-btn increase"
                onClick={handleIncrement}
              >
                +
              </button>

            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default ProductCard;