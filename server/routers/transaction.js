const express = require("express");
const printObject = require("../debug/debug");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const tagMiddleware = require("../middleware/tag");
const authMiddleware = require("../middleware/JWTVerification");
const { body, validationResult } = require("express-validator");

const router = express.Router();
const multer = require("multer");
const path = require("path");
const dayjs = require("dayjs");
const { getCharities } = require("../middleware/CharityMiddleware");
const { FindInputErrors } = require("../middleware/FindInputErrors");

// a placeholder currency conversiton table
const exchangeRates = {
  USD: 1,
  EUR: 1.08,
  GBP: 1.26,
  UGX: 0.00026,
  // Add more exchange rates as needed
};

// Validation laws
const validateTransaction = [
  body("amount").isFloat({ min: 0 }).withMessage("Amount must be non-negative"),
  body("currency")
    .isIn(["USD", "EUR", "GBP", "UGX"])
    .withMessage("Unallowed currency"),
  body("whatBrought")
    .isLength({ max: 255 })
    .withMessage("Inputs must be under 255 characters"),
  body("whatFor")
    .isLength({ max: 255 })
    .withMessage("Inputs must be under 255 characters"),
  // Add other validations as needed
];
// Add a new project for a user
router.post(
  "/",
  [authMiddleware, getCharities, validateTransaction, FindInputErrors],
  async (req, res) => {
    try {
      const {
        project, // projectId
        category, // type in db
        amount,
        currency,
        whatBrought,
        whatFor,
      } = req.body;

      const dollarAmount = amount / exchangeRates[currency];
      console.log("🚀 ~ router.post ~ dollarAmount:", dollarAmount);

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
  }
);

module.exports = router;
