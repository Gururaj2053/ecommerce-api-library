const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require("./routes/categoryRoutes");

connectDB();

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);
const orderRoutes = require("./routes/orderRoutes");
module.exports = app;
