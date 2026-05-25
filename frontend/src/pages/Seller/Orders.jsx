import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Orders = () => {
  const boxIcon = "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/boxIcon.svg";

 const [orderList, setOrderList] =
  useState([]);
  useEffect(() => {
  fetchOrders();
}, []);

const fetchOrders = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/orders/all`
    );

    const data = await response.json();

    if (data.success) {
      setOrderList(data.orders);
    }
  } catch (error) {
    console.log(error);
  }
};

  // 2. DYNAMICALLY UPDATE ORDER LOGISTICS STATUS
 const handleStatusChange =
  async (orderId, newStatus) => {

    try {

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/orders/status/${orderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      const data =
        await response.json();

      if (data.success) {

        setOrderList((prev) =>
          prev.map((order) =>
            order._id === orderId
              ? {
                  ...order,
                  status: newStatus,
                }
              : order
          )
        );

        toast.success(
          `Order updated to ${newStatus}`
        );
      }

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to update order"
      );

    }

  };

  return (
    <div className="flex-1 py-6 flex flex-col justify-between bg-[#fafbfc]">
      <div className="w-full bg-white p-6 md:p-10 rounded-xl border border-[#e2e8f0] shadow-sm max-w-5xl box-border mx-auto">
        
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#0f172a] tracking-tight m-0 mb-1">Fulfillment Operations Hub</h2>
          <p className="text-xs text-[#64748b] m-0">Monitor real-time incoming customer orders, manage destination logistics, and update pipeline delivery actions.</p>
        </div>

        {/* Orders Card Stack */}
        <div className="space-y-4">
          {orderList.map((order) => (
            <div 
              key={order.id} 
              className="flex flex-col md:grid md:grid-cols-[1.5fr_1.2fr_0.8fr_1.2fr] md:items-center gap-6 p-5 rounded-xl border border-[#e2e8f0] bg-white hover:border-[#1a8a50]/30 transition-all duration-200 shadow-sm"
            >
              
              {/* Item Details Column */}
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-lg bg-[#f8fafc] border border-[#e2e8f0] flex items-center justify-center flex-shrink-0 p-2.5 box-border">
                  <img className="w-full h-full object-contain opacity-70" src={boxIcon} alt="boxIcon" />
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-xs font-mono font-bold text-[#94a3b8] tracking-wider">{order.id}</span>
                  <div className="divide-y divide-[#f1f5f9]">
                    {order.items.map((item, idx) => (
                      <p key={idx} className="text-sm font-semibold text-[#0f172a] m-0 py-0.5">
                        {item.product.name}{" "}
                        <span className="text-[#1a8a50] bg-[#1a8a50]/8 text-xs px-1.5 py-0.5 rounded font-mono font-medium ml-1">
                          x{item.quantity} {item.unit || ""}
                        </span>
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Shipping Destination Column */}
              <div className="text-xs text-[#475569] space-y-1">
                <p className='font-bold text-sm text-[#334155] m-0 mb-1'>{order.address.firstName} {order.address.lastName}</p>
                <p className="m-0 leading-relaxed font-medium">
                  {order.address.street}, {order.address.city}, {order.address.state}, {order.address.zipcode}, {order.address.country}
                </p>
              </div>

              {/* Payment Summary Amount Column */}
              <div className="flex flex-col justify-center">
                <span className="text-[10px] font-bold text-[#94a3b8] tracking-wider uppercase mb-0.5">Total Revenue</span>
                <p className="font-extrabold text-base text-[#0f172a] m-0">₹{order.amount}</p>
              </div>

              {/* Status Manager & Meta Parameters Column */}
              <div className="flex flex-col sm:flex-row md:flex-col gap-4 md:gap-2 justify-between items-start md:items-stretch text-xs text-[#64748b] bg-[#f8fafc] md:bg-transparent p-3 md:p-0 rounded-lg">
                <div className="space-y-1 font-medium">
                  <p className="m-0">Method: <strong className="text-[#334155]">{order.paymentType}</strong></p>
                  <p className="m-0">Date: <span className="text-[#334155]">{order.orderDate}</span></p>
                  <p className="m-0">
                    Payment Status:{" "}
                    <span className={`font-bold ${order.isPaid ? 'text-[#1a8a50]' : 'text-amber-600'}`}>
                      {order.isPaid ? "Paid" : "Pending"}
                    </span>
                  </p>
                </div>

                {/* Dynamic Status Dropdown Controller Selector */}
                <div className="w-full sm:w-auto md:w-full">
                  <select 
                    value={order.status} 
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className={`outline-none px-3 py-1.5 rounded-md text-xs font-bold w-full cursor-pointer border appearance-none transition-all
                      ${order.status === 'Delivered' ? 'bg-[#1a8a50]/8 border-[#1a8a50]/20 text-[#1a8a50]' : ''}
                      ${order.status === 'Shipped' ? 'bg-blue-50 border-blue-200 text-blue-600' : ''}
                      ${order.status === 'Processing' ? 'bg-amber-50 border-amber-200 text-amber-600' : ''}
                    `}
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Orders;