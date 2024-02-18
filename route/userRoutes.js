// userRoutes.js

const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Rute untuk mendapatkan semua pengguna
router.get("/", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Rute untuk membuat pengguna baru
router.post("/", async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await prisma.user.create({ data: userData });
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Rute untuk mendapatkan detail pengguna berdasarkan ID
router.get("/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Rute untuk memperbarui detail pengguna berdasarkan ID
router.put("/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const userData = req.body;
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: userData,
    });
    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Rute untuk menghapus pengguna berdasarkan ID
router.delete("/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    await prisma.user.delete({ where: { id: userId } });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
