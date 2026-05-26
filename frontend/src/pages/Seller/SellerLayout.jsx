import React from "react";
import { Link, Routes, Route, useLocation } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import AddProduct from "./AddProduct";
import ProductList from "./ProductList";
import Orders from "./Orders";

const SellerLayout = () => {
  const location = useLocation();
  const { logoutUser } = useAppContext();
  const handleLogout = () => {
    logoutUser(); // ✅ clears state + localStorage + navigates
  };

  // Vector Icon Packs
  const dashboardicon = (
    <svg
      className="w-5 h-5"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5Zm16 14a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2ZM4 13a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6Zm16-2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6Z"
      />
    </svg>
  );

  const overviewicon = (
    <svg
      className="w-5 h-5"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
        d="M7.111 20A3.111 3.111 0 0 1 4 16.889v-12C4 4.398 4.398 4 4.889 4h4.444a.89.89 0 0 1 .89.889v12A3.111 3.111 0 0 1 7.11 20Zm0 0h12a.889.889 0 0 0 .889-.889v-4.444a.889.889 0 0 0-.889-.89h-4.389a.889.889 0 0 0-.62.253l-3.767 3.665a.933.933 0 0 0-.146.185c-.868 1.433-1.581 1.858-3.078 2.12Zm0-3.556h.009m7.933-10.927 3.143 3.143a.889.889 0 0 1 0 1.257l-7.974 7.974v-8.8l3.574-3.574a.889.889 0 0 1 1.257 0Z"
      />
    </svg>
  );

  const chaticon = (
    <svg
      className="w-5 h-5"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M7 9h5m3 0h2M7 12h2m3 0h5M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-6.616a1 1 0 0 0-.67.257l-2.88 2.592A.5.5 0 0 1 8 18.477V17a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
      />
    </svg>
  );

  const sidebarLinks = [
    { name: "Add Product", path: "/seller/dashboard", icon: dashboardicon },
    { name: "Product List", path: "/seller/product-list", icon: overviewicon },
    { name: "Orders", path: "/seller/orders", icon: chaticon },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#fafbfc] text-[#0f172a] font-sans antialiased">
      {/* ================= BRANDED TOP HEADER STRIP ================= */}
      <div className="flex items-center justify-between px-6 md:px-10 border-b border-[#e2e8f0] py-4 bg-white sticky top-0 z-50 shadow-sm">
        <Link to="/" className="flex items-center gap-2 no-underline group">
          <span className="font-mono text-xl font-black bg-[#1a8a50] text-white px-2.5 py-1 rounded-md tracking-tighter transition-transform group-hover:scale-95">
            NM
          </span>
          <span className="text-md font-bold tracking-tight text-[#0f172a] hidden sm:block font-sans">
            Nafeesathul Misriya{" "}
            <span className="text-[#1a8a50] font-mono text-xs ml-1 px-1.5 py-0.5 bg-[#1a8a50]/10 rounded font-normal">
              PORTAL
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2 text-sm text-[#64748b]">
            <span className="w-2 height-2 rounded-full bg-[#1a8a50] inline-block animate-pulse"></span>
            <p className="font-medium m-0">Hi, Admin</p>
          </div>
          <button
            onClick={handleLogout}
            className="border border-[#e2e8f0] bg-white text-[#64748b] rounded-lg text-xs font-semibold px-4 py-2 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all duration-200 cursor-pointer shadow-sm active:scale-95"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Split Panel Architecture Framework */}
      <div className="flex flex-1">
        {/* ================= SIDE NAVIGATION PANEL ================= */}
        <div className="md:w-64 w-16 border-r border-[#e2e8f0] pt-6 flex flex-col bg-white sticky top-[73px] h-[calc(100vh-73px)] box-border">
          <div className="flex flex-col gap-1 px-2">
            {sidebarLinks.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  to={item.path}
                  key={index}
                  className={`flex items-center py-3 px-4 gap-3.5 rounded-lg no-underline transition-all duration-200 group
                                        ${
                                          isActive
                                            ? "bg-[#1a8a50]/8 text-[#1a8a50] font-semibold"
                                            : "text-[#475569] hover:bg-[#f8fafc] hover:text-[#0f172a]"
                                        }`}
                >
                  <div
                    className={`transition-transform duration-200 group-hover:scale-105 ${isActive ? "text-[#1a8a50]" : "text-[#94a3b8]"}`}
                  >
                    {item.icon}
                  </div>
                  <span className="md:block hidden text-sm tracking-tight font-medium">
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Footnote Branding details inside layout canvas */}
          <div className="mt-auto p-4 border-t border-[#f1f5f9] hidden md:block text-center">
            <p className="text-[10px] font-mono tracking-wider text-[#94a3b8] uppercase m-0">
              © 2026 NM Digital Design
            </p>
          </div>
        </div>

        {/* ================= SUBVIEW WORKSPACE CORE ================= */}
        <div className="flex-1 p-6 md:p-10 box-border overflow-y-auto bg-[#f8fafc]">
          <Routes>
            <Route path="dashboard" element={<AddProduct />} />
            <Route path="product-list" element={<ProductList />} />
            <Route path="orders" element={<Orders />} />
            <Route
              path="*"
              element={
                <div className="bg-white p-8 rounded-xl border border-[#e2e8f0] text-center shadow-sm max-w-xl mx-auto my-10">
                  <span className="text-4xl block mb-2">🌿</span>
                  <h3 className="text-xl font-bold m-0 mb-2 text-[#0f172a]">
                    Welcome to Your Command Center
                  </h3>
                  <p className="text-sm text-[#64748b] m-0 mb-6 leading-relaxed">
                    Manage configurations across your local storefront
                    seamlessly. Select an option from the sidebar to modify
                    items.
                  </p>
                  <Link
                    to="dashboard"
                    className="inline-block bg-[#1a8a50] text-white font-semibold text-xs py-2.5 px-5 rounded-lg no-underline shadow-sm hover:bg-[#15703f] transition-all active:scale-95"
                  >
                    Launch Add Product Matrix
                  </Link>
                </div>
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default SellerLayout;
