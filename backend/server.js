import dotenv from "dotenv";
// 1. Initialize environment variables immediately at the absolute top
dotenv.config(); 

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary"; // Import Cloudinary SDK directly here

import authRoutes from "./routes/authRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

import { seedDatabase } from "./config/dbSeeder.js";

const app = express();

// ================= MIDDLEWARES =================
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

// Debugging logs for your credentials
console.log("Razorpay Key ID:", process.env.RAZORPAY_KEY_ID);

// ================= CLOUDINARY CONFIGURATION FUNCTION =================
const connectCloudinary = () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    console.log("=== Cloudinary Configuration Initialized ☁️ ===");
  } catch (error) {
    console.error("Cloudinary connection config error ❌:", error);
  }
};

// ================= ROUTES =================
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/payment", paymentRoutes);

// ================= DATABASE & SERVER INITIALIZATION =================
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB Connected ✅");

    // 2. Fire up Cloudinary credentials immediately after the DB connects successfully
    connectCloudinary();

    // Automatically drops stale data and forces fresh retail items on startup
    await seedDatabase();

    // Start listening only after database and config preparations are complete
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} 🚀`);
    });
  })
  .catch((err) => console.log("Database connection error ❌:", err));