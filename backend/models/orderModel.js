import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderId: String,

    userId: String,

    userEmail: String,

    date: String,

    status: {
      type: String,
      default: "Processing",
    },

    isPaid: {
      type: Boolean,
      default: false,
    },

    address: Object,

    items: Array,

    subtotal: Number,

    savings: Number,

    total: Number,

    paymentMethod: String,
  },
  { timestamps: true }
);

export default mongoose.model(
  "Order",
  orderSchema
);