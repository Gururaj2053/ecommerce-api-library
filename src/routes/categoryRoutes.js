const express = require("express");
const router = express.Router();
const {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory,
} = require("../controllers/categoryController");
const { isAdmin } = require("../middlewares/authMiddleware");

// CRUD routes for categories
router.post("/", createCategory);
router.get("/", getCategories);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

// Only admins can create, update, or delete categories
router.post("/", isAdmin, createCategory);
router.put("/:id", isAdmin, updateCategory);
router.delete("/:id", isAdmin, deleteCategory);


module.exports = router;
