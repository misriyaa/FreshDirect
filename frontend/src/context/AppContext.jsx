import { createContext, useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const API_URL = `"${import.meta.env.VITE_BACKEND_URL}:5000/api"`;

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();

  // ================= USER =================

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");

    return storedUser ? JSON.parse(storedUser) : null;
  });

  // ================= OTHER STATES =================

  const [isSeller, setisSeller] = useState(false);

  const [showUserLogin, setshowUserLogin] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const [cart, setCart] = useState([]);

  const [orders, setOrders] = useState([]);

  const [addresses, setAddresses] = useState([]);

  // ================= LOAD USER DATA =================

  useEffect(() => {
    if (user?._id) {
      fetchCart(user._id);

      fetchAddresses(user._id);
    }
  }, [user]);

  // ================= FETCH CART =================

  const fetchCart = async (userId) => {
    try {
      const response = await fetch(`${API_URL}/cart/${userId}`);

      const data = await response.json();

      if (data.success) {
        setCart(data.cart || []);
      }
    } catch (error) {
      console.log("Fetch Cart Error:", error);
    }
  };

  // ================= FETCH ADDRESSES =================

  const fetchAddresses = async (userId) => {
    try {
      const response = await fetch(`${API_URL}/address/${userId}`);

      const data = await response.json();

      if (data.success) {
        setAddresses(data.addresses || []);
      }
    } catch (error) {
      console.log("Fetch Address Error:", error);
    }
  };

  // ================= ADD ADDRESS =================

  const addAddress = async (addressData) => {
    try {
      if (!user?._id) {
        return {
          success: false,
        };
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
        setAddresses(data.addresses);

        return {
          success: true,
        };
      }

      return {
        success: false,
      };
    } catch (error) {
      console.log("Add Address Error:", error);

      return {
        success: false,
      };
    }
  };

  // ================= SYNC CART =================

  const syncCart = async (updatedCart) => {
    try {
      if (!user) return;

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
      console.log("Sync Cart Error:", error);
    }
  };

  // ================= ADD TO CART =================

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === product._id);

      let updatedCart;

      if (existingItem) {
        updatedCart = prevCart.map((item) =>
          item._id === product._id
            ? {
                ...item,
                qty: item.qty + 1,
              }
            : item,
        );
      } else {
        updatedCart = [
          ...prevCart,
          {
            ...product,
            qty: 1,
          },
        ];
      }

      syncCart(updatedCart);

      return updatedCart;
    });
  };

  // ================= REMOVE FROM CART =================

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === productId);

      if (!existingItem) return prevCart;

      let updatedCart;

      if (existingItem.qty === 1) {
        updatedCart = prevCart.filter((item) => item._id !== productId);
      } else {
        updatedCart = prevCart.map((item) =>
          item._id === productId
            ? {
                ...item,
                qty: item.qty - 1,
              }
            : item,
        );
      }

      syncCart(updatedCart);

      return updatedCart;
    });
  };

  // ================= CLEAR ITEM =================

  const clearFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item._id !== productId);

    setCart(updatedCart);

    syncCart(updatedCart);
  };

  // ================= CLEAR CART =================

  const clearCart = async () => {
    setCart([]);

    await syncCart([]);
  };

  // ================= LOGIN =================

  const loginUser = (userData, token) => {
    setUser(userData);

    localStorage.setItem("user", JSON.stringify(userData));

    localStorage.setItem("token", token);
  };

  // ================= LOGOUT =================

  const logoutUser = () => {
    localStorage.removeItem("user");

    localStorage.removeItem("token");

    setUser(null);

    setCart([]);

    setAddresses([]);

    navigate("/");
  };

  // ================= ORDERS =================

  const addOrder = (newOrder) => {
    setOrders((prevOrders) => [newOrder, ...prevOrders]);
  };

  // ================= CONTEXT VALUE =================

  const value = {
    navigate,

    // USER
    user,
    setUser,

    loginUser,
    logoutUser,

    // SELLER
    isSeller,
    setisSeller,

    // LOGIN MODAL
    showUserLogin,
    setshowUserLogin,

    // SEARCH
    searchQuery,
    setSearchQuery,

    // CART
    cart,
    setCart,

    addToCart,
    removeFromCart,
    clearFromCart,
    clearCart,

    // ORDERS
    orders,
    addOrder,

    // ADDRESS
    addresses,
    setAddresses,
    addAddress,
    fetchAddresses,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
