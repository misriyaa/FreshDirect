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
  const { isSeller, user } = useAppContext();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // 🌟 ADJUSTED SENSITIVITY CHECK: Verifies context state first, drops immediately if context is missing a user
  const checkLocalStorageAuth = () => {
    if (!user) return false; // If context user is null (logged out), auth is strictly false
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return false;
      const parsedUser = JSON.parse(storedUser);
      return parsedUser.role === "seller";
    } catch (e) {
      return false;
    }
  };

  // True access token verification matrix
  const hasSellerPrivileges = isSeller && checkLocalStorageAuth();

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

          {/* ================= FIXED SELLER PATH SYSTEM ================= */}
          
          {/* Base Entry point */}
          <Route 
            path="/seller" 
            element={hasSellerPrivileges ? <Navigate to="/seller/dashboard" replace /> : <Navigate to="/seller/login" replace />} 
          />
          
          {/* Login Gate Route */}
          <Route 
            path="/seller/login" 
            element={hasSellerPrivileges ? <Navigate to="/seller/dashboard" replace /> : <SellerLogin />} 
          />
          
          {/* Protected Area Layout Router */}
          <Route 
            path="/seller/*" 
            element={hasSellerPrivileges ? <SellerLayout /> : <Navigate to="/seller/login" replace />} 
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