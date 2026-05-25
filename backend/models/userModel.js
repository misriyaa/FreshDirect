import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  name: String,
  house: String,
  area: String,
  city: String,
  pin: String,
  isDefault: {
    type: Boolean,
    default: false,
  },
});

const userSchema = new mongoose.Schema(
  {
    name: String,

    email: {
      type: String,
      unique: true,
    },

    password: String,

    cart: {
      type: Array,
      default: [],
    },

    addresses: {
      type: [addressSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "User",
  userSchema
);