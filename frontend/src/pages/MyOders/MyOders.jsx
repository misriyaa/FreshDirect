import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import "./MyOrders.css";

function MyOrders() {
  const { navigate, user } = useAppContext();
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("All Order");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const tabs = ["All Order", "Summary", "Completed", "Cancelled"];

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders?email=${user?.email}`
      );
      const data = await response.json();
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filteredOrders = orders.filter((order) => {
    if (activeTab === "Completed") return order.status === "Delivered";
    if (activeTab === "Cancelled") return order.status === "Cancelled";
    return true;
  });

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "status-delivered";
      case "cancelled":
        return "status-cancelled";
      case "processing":
        return "status-processing";
      case "shipped":
        return "status-shipped";
      default:
        return "status-pending";
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="oh-page">
      <div className="oh-container">
        {/* Header */}
        <div className="oh-header">
          <h1 className="oh-title">Order History</h1>
        </div>

        {/* Toolbar */}
        <div className="oh-toolbar">
          <div className="oh-tabs">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`oh-tab-btn ${activeTab === tab ? "oh-tab-active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="oh-date-range">
            <span className="oh-date-icon">📅</span>
            <input
              type="date"
              className="oh-date-input"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
            <span className="oh-date-to">To</span>
            <span className="oh-date-icon">📅</span>
            <input
              type="date"
              className="oh-date-input"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
        </div>

        {/* Orders */}
        {filteredOrders.length > 0 ? (
          <div className="oh-orders-list">
            {filteredOrders.map((order) => (
              <div key={order._id} className="oh-order-card">
                {/* Card Head */}
                <div className="oh-card-head">
                  <div className="oh-card-meta">
                    <span className="oh-order-id">Order : #{order.orderId}</span>
                    <span className="oh-order-date">
                      Order Payment : {formatDate(order.createdAt)}
                    </span>
                  </div>
                  <div className="oh-card-actions">
                    <button className="oh-btn-invoice">Show Invoice</button>
                    <button
                      className="oh-btn-buy"
                      onClick={() => navigate("/all-products")}
                    >
                      Buy NOW
                    </button>
                  </div>
                </div>

                {/* Items */}
                <div className="oh-items-list">
                  {order.items?.map((item, index) => (
                    <div key={index} className="oh-item-row">
                      <div className="oh-item-left">
                        <img
                          src={
                            Array.isArray(item.image)
                              ? item.image[0]
                              : item.image
                          }
                          alt={item.name}
                          className="oh-item-img"
                        />
                        <div className="oh-item-info">
                          <h4 className="oh-item-name">{item.name}</h4>
                          <span className="oh-item-seller">By: {item.seller || "Seller"}</span>
                          <div className="oh-item-specs">
                            <span>Size: {item.size || "M"}</span>
                            <span>Qty: {item.quantity}</span>
                            <span className="oh-item-price">
                              ₹{item.price?.toFixed(2)}
                            </span>
                          </div>
                          {/* Inline status row — visible only on mobile */}
                          <div className="oh-item-inline-meta">
                            <span className={`oh-status-value ${getStatusClass(order.status)}`}>
                              {order.status}
                            </span>
                            <span className="oh-inline-dot">·</span>
                            <span className="oh-inline-delivery">
                              {formatDate(order.expectedDelivery || order.updatedAt)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="oh-item-middle">
                        <span className="oh-status-label">Status</span>
                        <span className={`oh-status-value ${getStatusClass(order.status)}`}>
                          {order.status}
                        </span>
                      </div>

                      <div className="oh-item-right">
                        <span className="oh-delivery-label">Delivery Expected by</span>
                        <span className="oh-delivery-date">
                          {formatDate(order.expectedDelivery || order.updatedAt)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Card Footer */}
                <div className="oh-card-footer">
                  <div className="oh-cancel-section">
                    <button className="oh-cancel-btn">
                      <span className="oh-cancel-x">✕</span>
                      cancel order
                    </button>
                    <span className="oh-payment-status">
                      Payment Is Succesfull
                    </span>
                  </div>
                  <div className="oh-total">
                    Total Price:{" "}
                    <span className="oh-total-value">₹{order.total}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="oh-empty">
            <span className="oh-empty-icon">📦</span>
            <h2>No Orders Yet</h2>
            <p>Looks like you haven't placed any orders yet.</p>
            <button
              className="oh-shop-btn"
              onClick={() => navigate("/all-products")}
            >
              Shop Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyOrders;