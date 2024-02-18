// app.js
const productRoutes = require("./route/productRoutes.js");
const userRoutes = require("./route/userRoutes.js");
const cartRoutes = require("./route/cartRoutes.js");
const orderRoutes = require("./route/ordersRoutes.js");

const express = require("express");
const routes = require("./route/productRoutes.js");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost ${PORT}`);
});
