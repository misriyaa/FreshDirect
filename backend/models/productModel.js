import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    offerPrice: {
      type: Number,
    },
   image: {
  type: String,
  required: true,
},
    isStatic: {
      type: Boolean,
      default: false,
    },
    inStock: {
  type: Boolean,
  default: true,
},
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;