const Order = require("../models/orderModel");

// Create a new order
exports.createOrder = async (req, res) => {
    try {
        const { products, totalAmount } = req.body;
        const order = new Order({
            user: req.user.id,
            products,
            totalAmount,
        });
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: "Error creating order", error });
    }
};

// Get all orders (admin) or user's orders
exports.getOrders = async (req, res) => {
    try {
        const orders = req.user.role === "admin"
            ? await Order.find().populate("user").populate("products.productId")
            : await Order.find({ user: req.user.id }).populate("products.productId");
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving orders", error });
    }
};
