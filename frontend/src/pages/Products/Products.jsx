import React, { useEffect, useState } from "react";
import "./Product.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useAppContext } from "../../context/AppContext";

function Products() {
  const { searchQuery, setSearchQuery } = useAppContext();

  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortAscending, setSortAscending] = useState(true);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // ================= FETCH PRODUCTS =================
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products`);
        const data = await response.json();
        if (data.success) {
          setProducts(data.products || []);
        }
      } catch (error) {
        console.error("Error fetching product data catalog:", error);
      }
    };
    fetchProducts();
  }, []);

  // ================= FILTER & SORT LOGIC =================
 const filteredProducts = products
  .filter((product) => {
    const matchesSearch = product.name
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    const matchesMinPrice =
      minPrice === "" || product.price >= parseFloat(minPrice);

    const matchesMaxPrice =
      maxPrice === "" || product.price <= parseFloat(maxPrice);

    // ✅ ADD THIS LINE
    const isInStock = product.inStock !== false;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesMinPrice &&
      matchesMaxPrice &&
      isInStock
    );
  })
  .sort((a, b) => (sortAscending ? a.price - b.price : b.price - a.price));
  return (
    <div className="products-layout-page">
      
      {/* Mobile Floating Action Controller Toggles */}
      <div className="mobile-filter-header-bar">
        <button 
          className="mobile-filter-trigger-btn"
          onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
        >
          {isMobileFiltersOpen ? "✕ Close Filters" : "⚙️ Filter & Sort"}
        </button>
        {searchQuery && (
          <button className="mobile-clear-search-tag" onClick={() => setSearchQuery("")}>
            Clear Search
          </button>
        )}
      </div>

      <div className="products-page-container">
        
        {/* ================= FILTER SIDEBAR ================= */}
        <aside className={`filter-sidebar ${isMobileFiltersOpen ? "mobile-drawer-open" : ""}`}>
          
          {/* CATEGORY BLOCK */}
          <div className="filter-section">
            <h3 className="filter-section-title">Category</h3>
            <div className="radio-group">
              {["All", "Fruit", "Vegetable"].map((cat) => (
                <label key={cat} className="radio-label">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === cat}
                    onChange={() => {
                      setSelectedCategory(cat);
                      setIsMobileFiltersOpen(false); // Quick close modal drawer on click
                    }}
                  />
                  <span className="custom-radio"></span>
                  {cat === "All" ? "All Products" : cat === "Fruit" ? "Fresh Fruits" : "Vegetables"}
                </label>
              ))}
            </div>
          </div>

          {/* PRICE SELECTION BLOCK */}
          <div className="filter-section">
            <h3 className="filter-section-title">Price Range (₹)</h3>
            <div className="price-range-inputs">
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="price-input-field"
              />
              <span className="range-divider">-</span>
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="price-input-field"
              />
            </div>
          </div>

          {/* SORT SWITCH CTA */}
          <div className="filter-section layout-no-border">
            <button
              className={`sort-toggle-btn ${!sortAscending ? "is-descending" : ""}`}
              onClick={() => setSortAscending(!sortAscending)}
            >
              Price: {sortAscending ? "Low to High ↑" : "High to Low ↓"}
            </button>
          </div>
        </aside>

        {/* ================= PRODUCTS MAIN LIST DISPLAY GRID ================= */}
        <main className="products-main-content">
          {searchQuery && (
            <div className="search-results-feedback-banner">
              Showing results for <strong className="text-highlight">"{searchQuery}"</strong>
              <span className="clear-search-action-x" onClick={() => setSearchQuery("")}>✕</span>
            </div>
          )}

          {filteredProducts.length > 0 ? (
            <div className="products-grid-layout">
              {filteredProducts.map((product) => {
                // Parse image strings accurately to prevent broken sources
                let imageUrl = "https://via.placeholder.com/300";
                if (product.images && product.images.length > 0) {
                  imageUrl = product.images[0].startsWith("http")
                    ? product.images[0]
                    : `${import.meta.env.VITE_BACKEND_URL}/${product.images[0]}`;
                } else if (product.image) {
                  imageUrl = product.image.startsWith("http")
                    ? product.image
                    : `${import.meta.env.VITE_BACKEND_URL}/${product.image}`;
                }

                return (
                  <div 
                    key={product._id || product.id} 
                    onClick={() => setSearchQuery("")} // Clears query seamlessly on route jump!
                    className="product-card-grid-wrapper"
                  >
                    <ProductCard
                      product={{
                        ...product,
                        img: imageUrl,
                      }}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="no-products-fallback">
              <span className="fallback-emoji">📦</span>
              <h3>No Produce Found</h3>
              <p>We couldn't find matching items for your selected filter metrics.</p>
            </div>
          )}
        </main>

      </div>
    </div>
  );
}

export default Products;