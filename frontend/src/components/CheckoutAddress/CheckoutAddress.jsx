import React, { useState } from "react";

import { toast } from "react-toastify";

import "./CheckoutAddress.css";

const CheckoutAddress = ({
  addresses = [],
  onAddAddress,
  onSelectDeliver,
}) => {

  const [
    isAddingAddress,
    setIsAddingAddress,
  ] = useState(false);

  const [loading, setLoading] =
    useState(false);

  const [addrForm, setAddrForm] =
    useState({
      name: "",
      house: "",
      area: "",
      city: "",
      pin: "",
    });

  // ================= ADD ADDRESS =================

  const handleAddAddressSubmit =
    async (e) => {

      e.preventDefault();

      if (
        !addrForm.name ||
        !addrForm.house ||
        !addrForm.city ||
        !addrForm.pin
      ) {

        toast.error(
          "Please fill all fields"
        );

        return;

      }

      try {

        setLoading(true);

        await onAddAddress({
          ...addrForm,
          isDefault: false,
        });

        toast.success(
          "Address added successfully"
        );

        setAddrForm({
          name: "",
          house: "",
          area: "",
          city: "",
          pin: "",
        });

        setIsAddingAddress(false);

      } catch (error) {

        toast.error(
          "Failed to add address"
        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <div className="checkout-pane-card animated-entry">

      <h1 className="pane-heading">
        Choose Address
      </h1>

      <p className="pane-subheading">

        Detailed address helps
        our delivery partner
        reach you faster

      </p>

      {isAddingAddress ? (

        <form
          className="inline-add-address-form"
          onSubmit={
            handleAddAddressSubmit
          }
        >

          <h3>
            Add New Address
          </h3>

          <div className="form-group-row">

            <input
              type="text"
              placeholder="Name"
              value={addrForm.name}
              onChange={(e) =>
                setAddrForm({
                  ...addrForm,
                  name:
                    e.target.value,
                })
              }
              required
            />

            <input
              type="text"
              placeholder="Pincode"
              value={addrForm.pin}
              onChange={(e) =>
                setAddrForm({
                  ...addrForm,
                  pin:
                    e.target.value,
                })
              }
              required
            />

          </div>

          <input
            type="text"
            placeholder="House / Street"
            value={addrForm.house}
            onChange={(e) =>
              setAddrForm({
                ...addrForm,
                house:
                  e.target.value,
              })
            }
            required
          />

          <div className="form-group-row">

            <input
              type="text"
              placeholder="Area"
              value={addrForm.area}
              onChange={(e) =>
                setAddrForm({
                  ...addrForm,
                  area:
                    e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="City"
              value={addrForm.city}
              onChange={(e) =>
                setAddrForm({
                  ...addrForm,
                  city:
                    e.target.value,
                })
              }
              required
            />

          </div>

          <div className="form-buttons-row">

            <button
              type="button"
              className="addr-cancel-btn"
              onClick={() =>
                setIsAddingAddress(
                  false
                )
              }
            >

              Cancel

            </button>

            <button
              type="submit"
              className="addr-save-btn"
              disabled={loading}
            >

              {loading
                ? "Saving..."
                : "Save Address"}

            </button>

          </div>

        </form>

      ) : (

        <div className="address-cards-flex-wrap">

          <div
            className="add-address-dash-card"
            onClick={() =>
              setIsAddingAddress(
                true
              )
            }
          >

            <span className="plus-symbol">
              +
            </span>

            <span className="dash-card-text">

              Add New Address

            </span>

          </div>

          {addresses.length > 0 ? (

            addresses.map((addr) => (

              <div
                key={
                  addr._id
                }
                className="nykaa-address-display-card"
              >

                <div className="address-card-header-row">

                  <span className="address-owner-name">

                    {addr.name}

                  </span>

                  {addr.isDefault && (

                    <span className="default-pill-badge">

                      DEFAULT

                    </span>

                  )}

                </div>

                <p className="address-text-paragraph">

                  {addr.house},
                  {" "}

                  {addr.area
                    ? `${addr.area}, `
                    : ""}

                  {addr.city}
                  -
                  {addr.pin}

                </p>

                <div className="address-card-actions-footer">

                  <button
                    className="addr-deliver-here-btn"
                    type="button"
                    onClick={() =>
                      onSelectDeliver(
                        addr
                      )
                    }
                  >

                    Deliver Here

                  </button>

                </div>

              </div>

            ))

          ) : (

            <p className="no-address-text">

              No saved addresses found

            </p>

          )}

        </div>

      )}

    </div>

  );
};

export default CheckoutAddress;