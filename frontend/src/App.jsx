import React, { useState } from "react";
import Navbar from "./components/navbar/Navbar";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Footer from "./components/footer/Footer";
import Products from "./pages/Products/Products";
import CartModal from "./components/CartModal/CartModal";
import Login from "./components/Login/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ProductDetails from "./pages/ProductDetail/ProductDetails";
import Payment from "./pages/Payment/Payment";
import MyOrders from "./pages/MyOders/MyOders";
import { useAppContext } from "./context/AppContext";
import SellerLogin from "./components/admin/SellerLogin/SellerLogin";
import SellerLayout from "./pages/Seller/SellerLayout";

const App = () => {
  const isSellerPath = useLocation().pathname.includes("seller");
  const { isSeller } = useAppContext();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div>
      {!isSellerPath && (
        <Navbar 
          onCartClick={() => setIsCartOpen(true)} 
          onLoginClick={() => setIsLoginOpen(true)} 
        />
      )}

      <div>
        <Routes>
          {/* Main Storefront Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/all-products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/checkout" element={<Payment />} />
          <Route path="/my-orders" element={<MyOrders />} />

          {/* ================= UPDATED CORE SELLER ROUTES SYSTEM ================= */}
          
          {/* Base Entry point: Redirects authenticated users or guests */}
          <Route 
            path="/seller" 
            element={isSeller ? <Navigate to="/seller/dashboard" replace /> : <Navigate to="/seller/login" replace />} 
          />
          
          {/* Isolated Login Gate Route */}
          <Route 
            path="/seller/login" 
            element={isSeller ? <Navigate to="/seller/dashboard" replace /> : <SellerLogin />} 
          />
          
          {/* Wildcard Layout Route: Handled dynamically by Nesting Sub-Routes inside SellerLayout */}
          <Route 
            path="/seller/*" 
            element={isSeller ? <SellerLayout /> : <Navigate to="/seller/login" replace />} 
          />
        </Routes>
      </div>
      
      {!isSellerPath && <Footer />}

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
    </div>
  );
};

export default App;