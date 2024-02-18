//orderRoutes.js

const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Rute untuk mendapatkan semua pesanan
router.get("/", async (req, res) => {
  try {
    const orders = await prisma.order.findMany();
    res.json(orders);
  } catch (error) {
    console.error("Error getting orders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Rute untuk membuat pesanan baru
router.post("/", async (req, res) => {
  try {
    const orderData = req.body;
    const newOrder = await prisma.order.create({ data: orderData });
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Rute untuk mendapatkan detail pesanan berdasarkan ID
router.get("/:id", async (req, res) => {
  try {
    const orderId = parseInt(req.params.id);
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    console.error("Error getting order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Rute untuk memperbarui detail pesanan berdasarkan ID
router.put("/:id", async (req, res) => {
  try {
    const orderId = parseInt(req.params.id);
    const orderData = req.body;
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: orderData,
    });
    res.json(updatedOrder);
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Rute untuk menghapus pesanan berdasarkan ID
router.delete("/:id", async (req, res) => {
  try {
    const orderId = parseInt(req.params.id);
    await prisma.order.delete({ where: { id: orderId } });
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
