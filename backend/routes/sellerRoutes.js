import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Seller } from "../models/sellerModel.js";

const router = express.Router();

// ================= MERCHANT ACCOUNT REGISTRATION =================
router.post("/register", async (req, res) => {
  try {
    const { shopName, email, password } = req.body;

    // Check for duplicate email profiles
    const historicalAccount = await Seller.findOne({ email });
    if (historicalAccount) {
      return res.status(400).json({ 
        success: false, 
        message: "This email address is already bound to a live merchant node." 
      });
    }

    // Check for duplicate shop names
    const brandConflict = await Seller.findOne({ shopName });
    if (brandConflict) {
      return res.status(400).json({ 
        success: false, 
        message: "This Shop Name is already allocated in our registry." 
      });
    }

    // Encrypt sensitive passwords before datastore insertion
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    // Save payload to MongoDB
    const operationalPayload = new Seller({
      shopName,
      email,
      password: encryptedPassword
    });

    const savedSeller = await operationalPayload.save();

    // Sign authentication state token using the JWT secret from your environment configurations
    const token = jwt.sign(
      { id: savedSeller._id, role: savedSeller.role },
      process.env.JWT_SECRET || "fallback_security_string",
      { expiresIn: "7d" }
    );

    res.status(201).json({
      success: true,
      token,
      seller: {
        id: savedSeller._id,
        shopName: savedSeller.shopName,
        email: savedSeller.email,
        role: savedSeller.role
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ================= VENDOR ROUTE AUTHENTICATION =================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Search for account profile matching email string
    const validatedMerchant = await Seller.findOne({ email });
    if (!validatedMerchant) {
      return res.status(404).json({ 
        success: false, 
        message: "Credentials mismatch: No account matches this email profile." 
      });
    }

    // Compare cryptographic password streams using bcrypt
    const isMatch = await bcrypt.compare(password, validatedMerchant.password);
    if (!isMatch) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid security credentials. Check password array values." 
      });
    }

    // Generate token string on successful profile verification
    const token = jwt.sign(
      { id: validatedMerchant._id, role: validatedMerchant.role },
      process.env.JWT_SECRET || "fallback_security_string",
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      token,
      seller: {
        id: validatedMerchant._id,
        shopName: validatedMerchant.shopName,
        email: validatedMerchant.email,
        role: validatedMerchant.role
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;