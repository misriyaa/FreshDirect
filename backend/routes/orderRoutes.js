import express from "express";
import {
  createOrder,
  getOrders,
  getAllOrders,
  updateOrderStatus,
} from "../controller/orderController.js";

const router = express.Router();

// ================= POST PATHS =================
router.post("/create", createOrder);

// ================= GET PATHS =================
// 🌟 FIXED: Mounted to return the total dataset for the admin hub view
router.get("/", getAllOrders); 

// 🌟 FIXED: Moved user-specific tracking loops to their own endpoint target
router.get("/customer", getOrders); 

// ================= PUT PATHS =================
router.put("/status/:id", updateOrderStatus);

export default router;