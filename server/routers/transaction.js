const express = require("express");
const printObject = require("../debug/debug");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const tagMiddleware = require("../middleware/tag");
const authMiddleware = require("../middleware/JWTVerification");

const router = express.Router();
const multer = require("multer");
const path = require("path");
const dayjs = require("dayjs");
const { getCharities } = require("../middleware/CharityMiddleware");

// Add a new project for a user
router.post("/", authMiddleware, getCharities, async (req, res) => {
  try {
    const {
      project, // projectId
      category, // type in db
      amount,
      currency,
      dollarAmount,
      whatBrought,
      whatFor,
    } = req.body;

    const newTransaction = await prisma.transaction.create({
      data: {
        type: category,
        whatFor: whatFor,
        whatBrought: whatBrought,
        amount: Number(amount),
        currency: currency,
        dollarAmount: Number(dollarAmount),
        projectId: project,
        posterId: req.user.id,
      },
    });

    res.status(201).json({
      message: "Transaction posted successfully!",
      transaction: newTransaction,
    });
  } catch (error) {
    console.error("Failed to add transaction:", error);
    res.status(500).json({ error: "Failed to add transaction" });
  }
});

module.exports = router;
