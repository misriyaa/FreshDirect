import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
  shopName: {
    type: String,
    required: [true, "Shop / Vendor designation is mandatory."],
    trim: true,
    unique: true
  },
  email: {
    type: String,
    required: [true, "Merchant registration email string is required."],
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, "Security password assignment is required."],
    minlength: [6, "Password depth must contain at least 6 structural units."]
  },
  role: {
    type: String,
    default: "seller"
  }
}, { timestamps: true });

export const Seller = mongoose.model("Seller", sellerSchema);