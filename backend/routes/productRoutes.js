import express from "express";


import upload from "../middleware/multerMiddleware.js";
import { addProduct, deleteProduct, getProducts, getSingleProduct, toggleStock } from "../controller/productContrller.js";

const router = express.Router();

router.post(
  "/add",
  upload.single("image"),
  addProduct
);

router.get("/", getProducts);

router.get("/:id", getSingleProduct);

router.patch("/:id/stock", toggleStock);

router.delete("/:id", deleteProduct);

export default router;