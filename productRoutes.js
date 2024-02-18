// productRoutes.js

const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new product
router.post("/", async (req, res) => {
  const { name, description, price, category } = req.body;
  try {
    const product = await prisma.product.create({
      data: { name, description, price, category },
    });
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a product
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category } = req.body;
  try {
    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id) },
      data: { name, description, price, category },
    });
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a product
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.product.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
