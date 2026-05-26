import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Initialize Context Instance Namespace
export const AppContext = createContext();

// Resolve base backend API endpoint dynamically from Vite environmental variables
const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api`;

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();

  // ==========================================================================
  // STATE DEFINITIONS & LOCAL STORAGE LIFECYCLES
  // ==========================================================================

  // Hydrate user session immediately from local browser caches
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Failed to parse cached user token string:", error);
      return null;
    }
  });

  const [isSeller, setisSeller] = useState(false);
  const [showUserLogin, setshowUserLogin] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);

  // ==========================================================================
  // AUTOMATED SYNCHRONIZATION EFFECT HOOKS
  // ==========================================================================

  // Automatically fetch fresh data records the moment user authentication changes
  useEffect(() => {
    if (user?._id) {
      fetchCart(user._id);
      fetchAddresses(user._id);
    } else {
      // Clean up local buffers on session teardown
      setCart([]);
      setAddresses([]);
    }
  }, [user]);

  // ==========================================================================
  // BACKEND REPOSITORY ACCESS METRICS (FETCHERS)
  // ==========================================================================

  // Retrieve current shopping cart collection mapping from the cluster
  const fetchCart = async (userId) => {
    try {
      const response = await fetch(`${API_URL}/cart/${userId}`);
      const data = await response.json();

      if (data.success) {
        setCart(data.cart || []);
      }
    } catch (error) {
      console.error("Fetch Cart API Exception Error:", error);
    }
  };

  // Retrieve saved consumer shipping targets from the database
  const fetchAddresses = async (userId) => {
    try {
      const response = await fetch(`${API_URL}/address/${userId}`);
      const data = await response.json();

      if (data.success) {
        setAddresses(data.addresses || []);
      }
    } catch (error) {
      console.error("Fetch Address API Exception Error:", error);
    }
  };

  // ==========================================================================
  // SHIPPING LOCATION MANAGEMENT LOGIC
  // ==========================================================================

  // Append a fresh destination record schema block to MongoDB
  const addAddress = async (addressData) => {
    try {
      if (!user?._id) {
        return { success: false, message: "Unauthenticated session context." };
      }

      const response = await fetch(`${API_URL}/address/${user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addressData),
      });

      const data = await response.json();

      if (data.success) {
        setAddresses(data.addresses || []);
        return { success: true };
      }

      return { success: false, message: data.message || "Failed to parse records." };
    } catch (error) {
      console.error("Add Address Execution Error:", error);
      return { success: false, error };
    }
  };

  // ==========================================================================
  // INTERACTIVE CART COMPONENT CONTROLLERS
  // ==========================================================================

  // Sync state modifications directly into the persistent database collection
  const syncCart = async (updatedCart) => {
    try {
      if (!user?._id) return;

      await fetch(`${API_URL}/cart/${user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart: updatedCart,
        }),
      });
    } catch (error) {
      console.error("Sync Cart Operation Failure:", error);
    }
  };

  // Increment item counts or append fresh produce cards to local cart tracking arrays
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === product._id);
      let updatedCart;

      if (existingItem) {
        updatedCart = prevCart.map((item) =>
          item._id === product._id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        updatedCart = [...prevCart, { ...product, qty: 1 }];
      }

      syncCart(updatedCart);
      return updatedCart;
    });
  };

  // Decrement line items safely or filter item indices when quantities reach zero
  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === productId);

      if (!existingItem) return prevCart;

      let updatedCart;

      if (existingItem.qty === 1) {
        updatedCart = prevCart.filter((item) => item._id !== productId);
      } else {
        updatedCart = prevCart.map((item) =>
          item._id === productId ? { ...item, qty: item.qty - 1 } : item
        );
      }

      syncCart(updatedCart);
      return updatedCart;
    });
  };

  // Instantly eliminate a categorical item stack completely from memory tracks
  const clearFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item._id !== productId);
    setCart(updatedCart);
    syncCart(updatedCart);
  };

  // Total database and state flush command
  const clearCart = async () => {
    setCart([]);
    await syncCart([]);
  };

  // ==========================================================================
  // USER PRIVILEGE SESSIONS WRAPPERS
  // ==========================================================================

  // Initialize consumer payload metrics securely into memory and storage caches
  const loginUser = (userData, token) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
  };

  // Terminate active profile traces and clean up memory structures
 const logoutUser = () => {
    // 1. Clear ALL storage footprints cleanly
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    // 2. Clear all state tracks synchronously
    setUser(null);
    setisSeller(false); // 🌟 CRITICAL: Must be reset to false here
    setCart([]);
    setAddresses([]);
    setOrders([]);

    // 3. Kick back to home or the blank seller login track
    navigate("/");
  };

  // Append validated incoming orders to client logs tracking modules
  const addOrder = (newOrder) => {
    setOrders((prevOrders) => [newOrder, ...prevOrders]);
  };

  // ==========================================================================
  // BUNDLED WORKSPACE CONTEXT EXPORT MATRIX
  // ==========================================================================
  const value = {
    navigate,

    // GLOBAL USER SESSION HANDLES
    user,
    setUser,
    loginUser,
    logoutUser,

    // BACK-OFFICE OPERATION SELLER FLAGS
    isSeller,
    setisSeller,

    // SCREEN VIEW MODAL OVERLAYS CONTROLLER
    showUserLogin,
    setshowUserLogin,

    // SYSTEM PRODUCT SEARCH QUERIES RUNTIME PIPELINE
    searchQuery,
    setSearchQuery,

    // SECURE BASKET INVENTORY TRACKERS
    cart,
    setCart,
    addToCart,
    removeFromCart,
    clearFromCart,
    clearCart,

    // FULFILLMENT REVENUE TRACKING METRICS
    orders,
    addOrder,

    // DESTINATION REGISTRY ARRAYS HANDLES
    addresses,
    setAddresses,
    addAddress,
    fetchAddresses,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Specialized hook accessor to easily parse context maps within child views
export const useAppContext = () => useContext(AppContext);