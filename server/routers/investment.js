const express = require("express");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const router = express.Router();

// Add a new investment for a user
router.post("/", async (req, res) => {
  try {
    const userId = req.user.userId;
    const {
      assetName,
      quantity,
      purchaseDate = new Date(),
      purchasePrice,
    } = req.body;

    const newInvestment = await prisma.investment.create({
      data: {
        assetName: assetName,
        quantity: quantity,
        purchaseDate: purchaseDate,
        purchasePrice: purchasePrice,
        userId: userId,
      },
    });
    res.status(201).json(newInvestment);
  } catch (error) {
    res.status(400).json({ error: "Failed to add investment" });
  }
});

// Retrieve all investments for a user
router.get("/", async (req, res) => {
  try {
    const userId = req.user.userId;
    const investments = await prisma.investment.findMany({
      where: { userId: userId },
    });
    res.status(201).json(investments);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Failed to fetch investments" });
  }
});

module.exports = router;
