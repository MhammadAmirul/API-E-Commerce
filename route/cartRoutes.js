//cartRoutes.js

const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Rute untuk mendapatkan semua keranjang belanja
router.get("/", async (req, res) => {
  try {
    const carts = await prisma.cart.findMany();
    res.json(carts);
  } catch (error) {
    console.error("Error getting carts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Rute untuk membuat keranjang belanja baru
router.post("/", async (req, res) => {
  try {
    const cartData = req.body;
    const checkCart = await prisma.cart.findUnique({
      where: { user_id: cartData.user_id },
    });
    if (!checkCart) {
      const insert = await prisma.cart.create({ user_id: cartData.user_id });
      await prisma.cartProduct.create({
        data: {
          cart_id: insert.id,
          product_id: cartData.product_id,
          quantity: cartData.quantity,
        },
      });
      return res.json({ message: "Successfully added cart" });
    } else {
      const cart = await prisma.cartProduct.findFirst({
        where: {
          cart_id: checkCart.id,
          product_id: cartData.product_id,
        },
      });
      if (!cart) {
        await prisma.cartProduct.create({
          data: {
            cart_id: insert.id,
            product_id: cartData.product_id,
            quantity: cartData.quantity,
          },
        });
        return res.json({ message: "Successfully added cart" });
      }
      await prisma.cartProduct.update({
        where: {
          cart_id_product_id: {
            cart_id: checkCart.id,
            product_id: cartData,
          },
        },
        data: { quantity: cart.quantity + cartData.quantity },
      });
      return res.json({ message: "Quantity added successfully" });
    }
  } catch (error) {
    console.error("Error creating cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Rute untuk mendapatkan detail keranjang belanja berdasarkan ID
router.get("/:id", async (req, res) => {
  try {
    const cartId = parseInt(req.params.id);
    const cart = await prisma.cart.findUnique({ where: { id: cartId } });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    res.json(cart);
  } catch (error) {
    console.error("Error getting cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Rute untuk memperbarui detail keranjang belanja berdasarkan ID
router.put("/:id", async (req, res) => {
  try {
    const cartId = parseInt(req.params.id);
    const cartData = req.body;
    const updatedCart = await prisma.cart.update({
      where: { id: cartId },
      data: cartData,
    });
    res.json(updatedCart);
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Rute untuk menghapus keranjang belanja berdasarkan ID
router.delete("/:id", async (req, res) => {
  try {
    const cartId = parseInt(req.params.id);
    await prisma.cart.delete({ where: { id: cartId } });
    res.json({ message: "Cart deleted successfully" });
  } catch (error) {
    console.error("Error deleting cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
