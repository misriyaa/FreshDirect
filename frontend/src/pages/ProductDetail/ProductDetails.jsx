import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useAppContext } from "../../context/AppContext";
import "./ProductDetails.css";


function ProductDetails() {
  const { id } = useParams();

  const { addToCart } = useAppContext();

  const [product, setProduct] = useState(null);

  const [activeImage, setActiveImage] = useState("");

  const [similarProducts, setSimilarProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  // ================= FETCH PRODUCT =================
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // ================= TRY BACKEND =================
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`
        );

        const data = await response.json();

        let fetchedProduct = data.product || data;

        // ================= STATIC PRODUCT FALLBACK =================
        if (
          !fetchedProduct ||
          fetchedProduct.message === "Product not found"
        ) {
          fetchedProduct = staticProducts.find(
            (item) => item.id === id
          );
        }

        if (fetchedProduct) {
          setProduct(fetchedProduct);

          // ================= IMAGES =================
       if (fetchedProduct.image) {

  const firstImage =
    fetchedProduct.image.startsWith("http")
      ? fetchedProduct.image
      : `${import.meta.env.VITE_BACKEND_URL}/${fetchedProduct.image}`;

  setActiveImage(firstImage);
}

          // ================= FETCH SIMILAR PRODUCTS =================
          let allProducts = [];

          try {
            const allProductsRes = await fetch(
              `"${import.meta.env.VITE_BACKEND_URL}/api/products"`
            );

            const allProductsData =
              await allProductsRes.json();

            allProducts =
              allProductsData.products ||
              allProductsData ||
              [];
          } catch (error) {
            console.log(error);
          }

          // ADD STATIC PRODUCTS ALSO
          allProducts = [
            ...allProducts,
            ...staticProducts,
          ];

          const related = allProducts
            .filter(
              (item) =>
                item.category ===
                  fetchedProduct.category &&
                (item._id || item.id) !==
                  (fetchedProduct._id ||
                    fetchedProduct.id)
            )
            .slice(0, 4);

          setSimilarProducts(related);
        }
      } catch (error) {
        console.log(error);

        // ================= STATIC FALLBACK =================
        const staticProduct =
          staticProducts.find(
            (item) => item.id === id
          );

        if (staticProduct) {
          setProduct(staticProduct);

          setActiveImage(
            staticProduct.images[0]
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();

    window.scrollTo(0, 0);
  }, [id]);

  // ================= LOADING =================
  if (loading) {
    return <h2>Loading...</h2>;
  }

  // ================= PRODUCT NOT FOUND =================
  if (!product) {
    return (
      <div className="details-error-wrapper">
        <h2>Product Not Found</h2>

        <Link
          to="/all-products"
          className="error-back-btn"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  // ================= IMAGE GALLERY =================
const imageGallery = product.image
  ? [
      product.image.startsWith("http")
        ? product.image
        : `${import.meta.env.VITE_BACKEND_URL}/${product.image}`,
    ]
  : ["https://via.placeholder.com/400"];

  // ================= ADD TO CART =================
  const handleAddToCartClick = () => {
    addToCart({
      ...product,
      _id: product._id || product.id,
      img: imageGallery[0],
    });

    toast.success(
      `${product.name} added to cart!`
    );
  };

  return (
    <div className="product-details-page">
      {/* BREADCRUMB */}
      <nav className="breadcrumb-strip">
        <Link to="/">Home</Link> /
        <Link to="/all-products">
          Products
        </Link>{" "}
        /
        <span className="current-crumb">
          {product.category}
        </span>
      </nav>

      {/* MAIN */}
      <div className="details-card-body">
        {/* GALLERY */}
        <div className="details-gallery-column">
        

          <div className="master-preview-frame">
            <img
              src={
                activeImage ||
                imageGallery[0]
              }
              alt={product.name}
            />
          </div>
        </div>

        {/* CONTENT */}
        <div className="details-content-column">
          <h1 className="details-title">
            {product.name}
          </h1>

          <div className="details-pricing-panel">
            <span className="mrp-strikethrough-tag">
              MRP:
              <del>
                ₹
                {Math.round(
                  product.price
                )}
              </del>
            </span>

            <div className="mrp-active-row">
              <span className="mrp-tag-text">
                Offer Price:
              </span>

              <span className="mrp-actual-value">
                ₹
                {product.offerPrice ||
                  product.price}
              </span>
            </div>
          </div>

          <div className="details-about-section">
            <h3>About Product</h3>

            <ul className="details-specs-list">
              <li>
                {product.description}
              </li>

              <li>
                Category:
                {" "}
                {product.category}
              </li>

              <li>
                Freshly sourced and
                packed
              </li>
            </ul>
          </div>

          <div className="details-cta-button-row">
            <button
              className="details-cart-add-btn"
              onClick={
                handleAddToCartClick
              }
            >
              Add to Cart
            </button>

            <button className="details-buy-now-btn">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* SIMILAR PRODUCTS */}
      {similarProducts.length > 0 && (
        <section className="similar-products-section">
          <hr className="section-divider" />

          <h2 className="similar-title">
            Related Products
          </h2>

          <div className="similar-products-grid">
            {similarProducts.map(
              (item) => (
                <ProductCard
                  key={
                    item._id ||
                    item.id
                  }
                  product={item}
                />
              )
            )}
          </div>
        </section>
      )}
    </div>
  );
}

export default ProductDetails;