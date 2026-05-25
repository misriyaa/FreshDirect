// src/pages/Payment/Payment.jsx

import React, {
  useState,
  useEffect,
} from "react";

import { useAppContext } from "../../context/AppContext";

import CheckoutPayment from "../../components/CheckoutPayment/CheckoutPayment";
import CheckoutAddress from "../../components/CheckoutAddress/CheckoutAddress";
import CheckoutAuth from "../../components/CheckoutAuth/CheckoutAuth";
import Login from "../../components/Login/Login";

import "./Payment.css";

function Payment() {

  const {
    user,
    cart,
    navigate,
    setCart,
    addresses,
    addAddress,
  } = useAppContext();

  const [currentStep, setCurrentStep] =
    useState(1);

  const [
    selectedAddress,
    setSelectedAddress,
  ] = useState(null);

  const [
    isLoginModalOpen,
    setIsLoginModalOpen,
  ] = useState(false);

  // ================= LOGIN STEP =================

  useEffect(() => {

    if (user) {

      setCurrentStep(2);

      setIsLoginModalOpen(false);

    } else {

      setCurrentStep(1);

    }

  }, [user]);

  // ================= TOTALS =================

  const subtotal = cart.reduce(
    (acc, item) =>
      acc + item.price * item.qty,
    0
  );

  const savings = 5;

  const totalAmount =
    subtotal > 0
      ? subtotal - savings
      : 0;

  // ================= ADD ADDRESS =================

  const handleAddNewAddress =
    async (newAddr) => {

      try {

        await addAddress(newAddr);

      } catch (error) {

        console.log(error);

      }

    };

  // ================= SELECT ADDRESS =================

  const handleSelectDeliverAddress =
    (addr) => {

      setSelectedAddress(addr);

      setCurrentStep(3);

    };

  // ================= SAVE ORDER =================

  const saveOrderToDatabase =
    async (orderData) => {

      try {

        const response =
          await fetch(
            `"${import.meta.env.VITE_BACKEND_URL}/api/orders/create"`,
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify(
                orderData
              ),
            }
          );

        const data =
          await response.json();

        return data;

      } catch (error) {

        console.log(error);

        return {
          success: false,
        };

      }
    };

  // ================= PLACE ORDER =================

  const handlePlaceOrderCheckout =
    async (paymentMethodName) => {

      try {

        // ================= COD =================

        if (
          paymentMethodName
            .toLowerCase() === "cod"
        ) {

          const pseudoOrderId =
            `FD-2026-${Math.floor(
              1000 +
                Math.random() * 9000
            )}`;

          const detailedOrderSnapshot =
            {

              orderId:
                pseudoOrderId,

              userId:
                user?._id,

              userEmail:
                user?.email,

              date:
                new Date().toLocaleDateString(),

              status:
                "Processing",

              address:
                selectedAddress,

              items: [...cart],

              subtotal,

              savings,

              total:
                totalAmount,

              paymentMethod:
                "COD",
            };

          const saveOrder =
            await saveOrderToDatabase(
              detailedOrderSnapshot
            );

          if (saveOrder.success) {

            alert(
              "Order placed successfully"
            );

            setCart([]);

            navigate(
              "/my-orders"
            );

          } else {

            alert(
              "Failed to save order"
            );

          }

          return;
        }

        // ================= CREATE PAYMENT ORDER =================

        const orderResponse =
          await fetch(
            `"${import.meta.env.VITE_BACKEND_URL}/api/payment/create-order"`,
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                amount:
                  totalAmount,
              }),
            }
          );

        const orderData =
          await orderResponse.json();

        if (!orderData.success) {

          alert(
            "Failed to create payment order"
          );

          return;
        }

        const order =
          orderData.order;

        // ================= RAZORPAY =================

        const options = {

          key:
            "rzp_test_StTLDNqUhQ26G4",

          amount:
            order.amount,

          currency:
            order.currency,

          name:
            "FreshDirect",

          description:
            "Order Payment",

          order_id:
            order.id,

          handler:
            async function (
              response
            ) {

              try {

                // ================= VERIFY PAYMENT =================

                const verifyRes =
                  await fetch(
                    `"${import.meta.env.VITE_BACKEND_URL}/api/payment/verify-payment"`,
                    {
                      method:
                        "POST",

                      headers: {
                        "Content-Type":
                          "application/json",
                      },

                      body:
                        JSON.stringify(
                          {
                            razorpay_order_id:
                              response.razorpay_order_id,

                            razorpay_payment_id:
                              response.razorpay_payment_id,

                            razorpay_signature:
                              response.razorpay_signature,
                          }
                        ),
                    }
                  );

                const verifyData =
                  await verifyRes.json();

                if (
                  verifyData.success
                ) {

                  const pseudoOrderId =
                    `FD-2026-${Math.floor(
                      1000 +
                        Math.random() *
                          9000
                    )}`;

                  const detailedOrderSnapshot =
                    {

                      orderId:
                        pseudoOrderId,

                      userId:
                        user?._id,

                      userEmail:
                        user?.email,

                      date:
                        new Date().toLocaleDateString(),

                      status:
                        "Paid",

                      address:
                        selectedAddress,

                      items: [
                        ...cart,
                      ],

                      subtotal,

                      savings,

                      total:
                        totalAmount,

                      paymentMethod:
                        "RAZORPAY",
                    };

                  const saveOrder =
                    await saveOrderToDatabase(
                      detailedOrderSnapshot
                    );

                  if (
                    saveOrder.success
                  ) {

                    alert(
                      "Payment successful"
                    );

                    setCart([]);

                    navigate(
                      "/my-orders"
                    );

                  } else {

                    alert(
                      "Failed to save order"
                    );

                  }

                } else {

                  alert(
                    "Payment verification failed"
                  );

                }

              } catch (error) {

                console.log(error);

                alert(
                  "Verification failed"
                );

              }
            },

          prefill: {

            name:
              user?.name || "",

            email:
              user?.email || "",
          },

          theme: {
            color: "#0f7a2f",
          },
        };

        const razorpay =
          new window.Razorpay(
            options
          );

        razorpay.open();

      } catch (error) {

        console.log(error);

        alert(
          "Payment failed"
        );

      }
    };

  return (

    <div className="nykaa-checkout-page">

      {/* STEP PROGRESS */}

      <div className="checkout-step-progress-container">

        <span className="step-progress-upper-tag">
          STEP PROGRESS
        </span>

        <div className="minimal-stepper-row">

          {/* STEP 1 */}

          <div
            className={`
              progress-step-node
              ${
                currentStep === 1 &&
                !user
                  ? "is-active"
                  : ""
              }
              ${
                user
                  ? "is-complete"
                  : ""
              }
            `}
          >

            <div className="progress-node-circle">

              {user ? "✓" : "1"}

            </div>

            <span className="progress-node-label">

              {user
                ? "Logged In"
                : "Login"}

            </span>

          </div>

          <div
            className={`progress-bridge-line ${
              currentStep > 1
                ? "filled"
                : ""
            }`}
          />

          {/* STEP 2 */}

          <div
            className={`progress-step-node ${
              currentStep === 2
                ? "is-active"
                : ""
            } ${
              currentStep > 2
                ? "is-complete"
                : ""
            }`}
          >

            <div className="progress-node-circle">

              {currentStep > 2
                ? "✓"
                : "2"}

            </div>

            <span className="progress-node-label">
              Address
            </span>

          </div>

          <div
            className={`progress-bridge-line ${
              currentStep > 2
                ? "filled"
                : ""
            }`}
          />

          {/* STEP 3 */}

          <div
            className={`progress-step-node ${
              currentStep === 3
                ? "is-active"
                : ""
            }`}
          >

            <div className="progress-node-circle">
              3
            </div>

            <span className="progress-node-label">
              Payment
            </span>

          </div>

        </div>

      </div>

      {/* MAIN */}

      <div className="checkout-main-grid">

        <div className="checkout-left-workspace">

          {!user &&
            currentStep === 1 && (

              <CheckoutAuth
                onOpenLogin={() =>
                  setIsLoginModalOpen(
                    true
                  )
                }
              />

            )}

          {user &&
            currentStep === 2 && (

              <CheckoutAddress
                addresses={
                  addresses || []
                }
                onAddAddress={
                  handleAddNewAddress
                }
                onSelectDeliver={
                  handleSelectDeliverAddress
                }
              />

            )}

          {user &&
            currentStep === 3 && (

              <CheckoutPayment
                totalAmount={
                  totalAmount
                }
                onPlaceOrder={
                  handlePlaceOrderCheckout
                }
              />

            )}

        </div>

      </div>

      {/* LOGIN MODAL */}

      <Login
        isOpen={
          isLoginModalOpen
        }
        onClose={() =>
          setIsLoginModalOpen(
            false
          )
        }
      />

    </div>

  );
}

export default Payment;