import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../../config";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH =================
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/products`);
      const data = await res.json();
      setProducts(data.products || []);
    } catch (err) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ================= TOGGLE STOCK =================
  const handleToggleStock = async (id) => {
    try {
      const res = await fetch(
        `${BACKEND_URL}/api/products/${id}/stock`,
        { method: "PATCH" }
      );
      const data = await res.json();

      if (data.success) {
        setProducts((prev) =>
          prev.map((p) => (p._id === id ? data.product : p))
        );
        toast.success("Stock updated");
      }
    } catch (err) {
      toast.error("Failed to update stock");
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete ${name}?`)) return;

    try {
      const res = await fetch(
        `${BACKEND_URL}/api/products/${id}`,
        { method: "DELETE" }
      );
      const data = await res.json();

      if (data.success) {
        setProducts((prev) => prev.filter((p) => p._id !== id));
        toast.success("Deleted successfully");
      }
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-lg font-semibold text-gray-600 animate-pulse">
          Loading products...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-10 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* ================= ADMIN MANAGEMENT TABLE ================= */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Inventory Management</h1>
              <p className="text-sm text-gray-500 mt-0.5">Manage stock status and product visibility</p>
            </div>
            <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full">
              {products.length} Total Items
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-400 uppercase text-xs tracking-wider font-semibold border-b border-gray-100">
                  <th className="py-4 px-6">Name</th>
                  <th className="py-4 px-6">Category</th>
                  <th className="py-4 px-6">Price</th>
                  <th className="py-4 px-6 text-center">Stock Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-10 text-gray-400">
                      No products found.
                    </td>
                  </tr>
                ) : (
                  products.map((p) => (
                    <tr key={p._id} className="hover:bg-gray-50/70 transition-colors">
                      <td className="py-4 px-6 font-medium text-gray-900">{p.name}</td>
                      <td className="py-4 px-6 text-gray-500">
                        <span className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-md">
                          {p.category || "General"}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-semibold text-gray-900">
                        ₹{(p.offerPrice || p.price).toLocaleString("en-IN")}
                      </td>
                      
                      {/* ================= STYLED TOGGLE SWITCH ================= */}
                      <td className="py-4 px-6 text-center">
                        <div className="flex flex-col items-center justify-center gap-1">
                          <button
                            onClick={() => handleToggleStock(p._id)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                              p.inStock ? "bg-green-500" : "bg-gray-300"
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform duration-200 ${
                                p.inStock ? "translate-x-6" : "translate-x-1"
                              }`}
                            />
                          </button>
                          <span className={`text-[10px] font-bold uppercase tracking-wider ${
                            p.inStock ? "text-green-600" : "text-gray-400"
                          }`}>
                            {p.inStock ? "In stock" : "Out of stock"}
                          </span>
                        </div>
                      </td>

                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => handleDelete(p._id, p.name)}
                          className="text-red-500 hover:text-red-700 font-medium text-sm transition-colors px-3 py-1.5 rounded-md hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* ================= FRONTEND PRODUCT GRID ================= */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Available Products</h2>
            <p className="text-gray-500 text-sm mt-1">Live customer-facing product catalogue</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.filter((p) => p.inStock !== false).length === 0 ? (
              <div className="col-span-full bg-white border border-dashed border-gray-200 rounded-xl p-12 text-center text-gray-400">
                No active products available on the storefront.
              </div>
            ) : (
              products
                .filter((p) => p.inStock !== false)
                .map((p) => (
                  <div 
                    key={p._id} 
                    className="group bg-white rounded-xl border border-gray-200/80 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <div className="relative aspect-video w-full bg-gray-100 overflow-hidden">
                      <img
                        src={
                          p.image?.startsWith("http")
                            ? p.image
                            :`${BACKEND_URL}/${p.image}`
                        }
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500&auto=format&fit=crop&q=60";
                        }}
                      />
                    </div>

                    <div className="p-4">
                      <span className="text-xs uppercase font-semibold text-gray-400 tracking-wider">
                        {p.category || "Product"}
                      </span>
                      <h3 className="font-semibold text-gray-800 text-base mt-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {p.name}
                      </h3>
                      <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-lg font-bold text-gray-900">
                          ₹{(p.offerPrice || p.price).toLocaleString("en-IN")}
                        </span>
                        {p.offerPrice && p.price !== p.offerPrice && (
                          <span className="text-sm text-gray-400 line-through">
                            ₹{p.price.toLocaleString("en-IN")}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
            )}
          </div>
        </section>

      </div>
    </div>
  );
}

export default ProductList;