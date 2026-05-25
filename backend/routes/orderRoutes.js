import express from "express";

import {
  createOrder,
  getOrders,
  updateOrderStatus,
  getAllOrders,
} from "../controller/orderController.js";

const router = express.Router();

router.post("/create", createOrder);

router.get("/", getOrders);

router.get("/all", getAllOrders);

router.put(
  "/status/:orderId",
  updateOrderStatus
);

export default router;