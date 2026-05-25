import Product from "../models/productModel.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// ================= ADD PRODUCT =================
export const addProduct = async (req, res) => {
  try {
    const { name, description, category, price, offerPrice } = req.body;

    // 1. Check if an image file was provided by Multer
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a product image",
      });
    }

    // 2. Upload the temporary local file to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path, {
      folder: "products", // Organizes assets into a 'products' folder in your Cloudinary console
      resource_type: "image",
    });

    // 3. Delete the temporary file from your backend local 'uploads/' folder immediately
    fs.unlinkSync(req.file.path);

    // 4. Save the product with Cloudinary's secure absolute URL
    const product = new Product({
      name,
      description,
      category,
      price,
      offerPrice,
      image: cloudinaryResponse.secure_url, // Saves the complete https://res.cloudinary.com/... link
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    // Cleanup: If Mongoose or Cloudinary crashes mid-execution, delete the local file so it doesn't get stuck
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET ALL PRODUCTS =================
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET SINGLE PRODUCT =================
export const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= TOGGLE STOCK =================
export const toggleStock = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    product.inStock = !product.inStock;
    await product.save();

    res.json({
      success: true,
      message: "Stock updated",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= DELETE PRODUCT (WITH CLOUDINARY CLEANUP) =================
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // 1. Extract the Cloudinary Public ID to delete the image from the cloud
    // Example url: https://res.cloudinary.com/cloudname/image/upload/v12345/products/abcde123.jpg
    // Extracts: "products/abcde123"
    if (product.image && product.image.includes("res.cloudinary.com")) {
      try {
        const urlParts = product.image.split("/");
        const folderAndFileName = urlParts.slice(-2).join("/"); // gets 'products/abcde123.jpg'
        const publicId = folderAndFileName.split(".")[0]; // removes extension, leaves 'products/abcde123'

        await cloudinary.uploader.destroy(publicId);
      } catch (cloudinaryDelError) {
        console.error("Failed to delete image from Cloudinary:", cloudinaryDelError.message);
        // We continue executing so the database entry still gets deleted if the asset was already gone
      }
    }

    // 2. Remove the product document from MongoDB
    await Product.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Product and associated media deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};