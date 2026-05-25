import express from "express";
import {
  createOrder,
  getOrders,
} from "../controller/orderController.js";

const router = express.Router();

router.post("/create", createOrder);

router.get("/", getOrders);

export default router;