import express from "express";

import {
  createOrder,
  getOrders,
  updateOrderStatus,
} from "../controller/orderController.js";

const router = express.Router();

router.post("/create", createOrder);

router.get("/", getOrders);

router.put("/status/:id", updateOrderStatus);

export default router;