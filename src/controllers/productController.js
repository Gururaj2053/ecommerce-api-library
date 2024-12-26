const Product = require("../models/productModel");

// Get all products with pagination and sorting
exports.getProducts = async (req, res) => {
    const { page = 1, limit = 10, sort = "name" } = req.query;
    try {
        const products = await Product.find()
            .sort(sort)
            .skip((page - 1) * limit)
            .limit(Number(limit));
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving products", error });
    }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving product", error });
    }
};

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const { name, price, description, category, stock } = req.body;
        const product = new Product({
            name,
            price,
            description,
            category,
            stock,
        });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: "Error creating product", error });
    }
};

// Update a product
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, description, category, stock } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { name, price, description, category, stock },
            { new: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: "Error updating product", error });
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error });
    }
};

// Search products by keyword
exports.searchProducts = async (req, res) => {
    const { keyword } = req.query;
    try {
        const products = await Product.find({
            name: { $regex: keyword, $options: "i" },
        });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error searching products", error });
    }
};
