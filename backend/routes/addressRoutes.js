import express from "express";
import { addUserAddress, getUserAddresses } from "../controller/addressContoller.js";



const router = express.Router();

// GET ALL ADDRESSES

router.get(
  "/:userId",
  getUserAddresses
);

// ADD NEW ADDRESS

router.post(
  "/:userId",
  addUserAddress
);

export default router;