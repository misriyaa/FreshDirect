import express from "express";

import {
  createRazorpayOrder,
  verifyPayment,
} from "../controller/paymentController.js";

const router = express.Router();

// CREATE REAL RAZORPAY ORDER
router.post(
  "/create-order",
  createRazorpayOrder
);

// VERIFY PAYMENT
router.post(
  "/verify-payment",
  verifyPayment
);

export default router;