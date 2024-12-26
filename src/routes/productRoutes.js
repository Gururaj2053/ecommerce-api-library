const express = require("express");
const router = express.Router();
const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
} = require("../controllers/productController");
const { isAdmin } = require("../middlewares/authMiddleware");

// Public Routes
router.get("/", getProducts); // Get all products with pagination and sorting
router.get("/search", searchProducts); // Search products by keyword
router.get("/:id", getProductById); // Get a single product by ID

// Admin Routes
router.post("/", isAdmin, createProduct); // Create a new product
router.put("/:id", isAdmin, updateProduct); // Update a product
router.delete("/:id", isAdmin, deleteProduct); // Delete a product

module.exports = router;
