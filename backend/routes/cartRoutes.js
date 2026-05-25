import express from "express";

import {
  getCart,
  saveCart,
} from "../controller/cartController.js";

const router = express.Router();

router.get("/:userId", getCart);

router.post("/:userId", saveCart);

export default router;