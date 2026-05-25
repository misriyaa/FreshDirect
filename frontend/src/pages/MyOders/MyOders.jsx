import React, {
  useEffect,
  useState,
} from "react";

import { useAppContext }
from "../../context/AppContext";

import "./MyOders.css";

function MyOrders() {

  const {
    navigate,
    user,
  } = useAppContext();

  const [orders, setOrders] =
    useState([]);

  useEffect(() => {

    fetchOrders();

  }, []);

  const fetchOrders =
    async () => {

      try {

        const response =
          await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/orders?email=${user?.email}`
          );

        const data =
          await response.json();

        if (data.success) {

          setOrders(data.orders);

        }

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <div className="orders-dashboard-page">

      <div className="orders-dashboard-container">

        <div className="dashboard-title-header">

          <h1>
            My Orders
          </h1>

          <p>
            Track your purchases and delivery updates
          </p>

        </div>

        {orders.length > 0 ? (

          <div className="orders-history-vertical-stack">

            {orders.map((order) => (

              <div
                key={order._id}
                className="order-history-card-item"
              >

                {/* TOP BAR */}

                <div className="order-card-top-summary-bar">

                  <div className="meta-info-grid-cell">

                    <span className="cell-label-tag">
                      ORDER ID
                    </span>

                    <span className="cell-value-text code-font">
                      #{order.orderId}
                    </span>

                  </div>

                  <div className="meta-info-grid-cell">

                    <span className="cell-label-tag">
                      TOTAL
                    </span>

                    <span className="cell-value-text">
                      ₹{order.total}
                    </span>

                  </div>

                  <div className="meta-info-grid-cell">

                    <span className="cell-label-tag">
                      PAYMENT
                    </span>

                    <span className="payment-method-tag-indicator">
                      {order.paymentMethod}
                    </span>

                  </div>

                  <div className="meta-info-grid-cell">

                    <span className="cell-label-tag">
                      STATUS
                    </span>

                    <div className="status-indicator-badge-row">

                      <span
                        className={`status-pulse-dot ${order.status?.toLowerCase()}`}
                      />

                      <span className="status-text-highlight">
                        {order.status}
                      </span>

                    </div>

                  </div>

                </div>

                {/* BODY */}

                <div className="order-card-inner-split-body">

                  {/* LEFT */}

                  <div className="order-items-left-column">

                    <h3 className="column-subheading">
                      Ordered Items
                    </h3>

                    <div className="items-list-embedded-rows-stack">

                      {order.items?.map((item, index) => (

                        <div
                          key={index}
                          className="embedded-item-micro-flex-card"
                        >

                          <img
                            src={
                              Array.isArray(item.image)
                                ? item.image[0]
                                : item.image
                            }
                            alt={item.name}
                            className="micro-item-thumb-avatar"
                          />

                          <div className="micro-item-details-block">

                            <h4>
                              {item.name}
                            </h4>

                            <span className="micro-item-unit-pricing-math">

                              {item.quantity} × ₹{item.price}

                            </span>

                            <span className="micro-item-row-total-price">

                              ₹{item.quantity * item.price}

                            </span>

                          </div>

                        </div>

                      ))}

                    </div>

                  </div>

                  {/* RIGHT */}

                  <div className="order-receipts-right-column">

                    <h3 className="column-subheading">
                      Order Timeline
                    </h3>

                    <div className="vertical-timeline-tracker-container">

                      <div className="timeline-step-node active-node">

                        <div className="timeline-date-left">
                          ✓
                        </div>

                        <div className="timeline-center-axis">

                          <div className="timeline-checkpoint-dot" />

                          <div className="timeline-connector-line" />

                        </div>

                        <div className="timeline-content-right">

                          <h5>
                            Order Placed
                          </h5>

                          <p>
                            Your order has been successfully placed
                          </p>

                        </div>

                      </div>

                      <div
                        className={`timeline-step-node ${
                          order.status === "Processing" ||
                          order.status === "Shipped" ||
                          order.status === "Delivered"
                            ? "active-node"
                            : "inactive-node"
                        }`}
                      >

                        <div className="timeline-date-left">
                          ●
                        </div>

                        <div className="timeline-center-axis">

                          <div className="timeline-checkpoint-dot" />

                          <div className="timeline-connector-line" />

                        </div>

                        <div className="timeline-content-right">

                          <h5>
                            Processing
                          </h5>

                          <p>
                            Seller is preparing your order
                          </p>

                        </div>

                      </div>

                      <div
                        className={`timeline-step-node ${
                          order.status === "Shipped" ||
                          order.status === "Delivered"
                            ? "active-node"
                            : "inactive-node"
                        }`}
                      >

                        <div className="timeline-date-left">
                          ●
                        </div>

                        <div className="timeline-center-axis">

                          <div className="timeline-checkpoint-dot" />

                          <div className="timeline-connector-line" />

                        </div>

                        <div className="timeline-content-right">

                          <h5>
                            Shipped
                          </h5>

                          <p>
                            Your package is on the way
                          </p>

                        </div>

                      </div>

                      <div
                        className={`timeline-step-node ${
                          order.status === "Delivered"
                            ? "active-node"
                            : "inactive-node"
                        }`}
                      >

                        <div className="timeline-date-left">
                          ●
                        </div>

                        <div className="timeline-center-axis">

                          <div className="timeline-checkpoint-dot" />

                        </div>

                        <div className="timeline-content-right">

                          <h5>
                            Delivered
                          </h5>

                          <p>
                            Package delivered successfully
                          </p>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

        ) : (

          <div className="empty-orders-dashboard-fallback">

            <span className="empty-dashboard-icon-illustration">
              📦
            </span>

            <h2>
              No Orders Yet
            </h2>

            <p>
              Looks like you haven’t placed any orders yet.
            </p>

            <button
              className="return-shop-cta-btn"
              onClick={() =>
                navigate("/all-products")
              }
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