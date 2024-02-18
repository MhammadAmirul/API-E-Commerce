// productRoutes.js

const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const routes = express.Router();

//rute mendapatkan semua product
routes.get("/", async (req, res) => {
  const product = await prisma.product.findMany();
  res.json({ message: "OK", product });
});

//rute unntuk menampilkan product
routes.post("/", async (req, res) => {
  const body = req.body;
  const product = await prisma.product.create({ data: body });
  res.json({ message: "OK", product });
});

//menambahkan product
routes.put("/:id", async (req, res) => {
  const product = parseInt(req.params.id);
  const updateData = req.body;
  await prisma.product.update({
    where: {
      id: product,
    },
    data: updateData,
  });
  res.json({ message: "OK" });
});

//menghapus product
routes.delete("/:id", async (req, res) => {
  const product = parseInt(req.params.id);
  await prisma.product.delete({
    where: {
      id: product,
    },
  });
  res.json({ message: "OK" });
});
// Routes for managing products

module.exports = routes;
