const express = require("express");
const printObject = require("../debug/debug");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const authMiddleware = require("../middleware/JWTVerification");

const router = express.Router();
const path = require("path");
const {
  getCharities,
  hasCharityHeadRights,
} = require("../middleware/CharityMiddleware");

// addUserId (the already existing user to be added to the project),
// projectId, projectLead
// needed: must be in the same charity as the project
// needed: if being added as project lead then requestingUser must be
// charity head.
router.post("/", authMiddleware, getCharities, async (req, res) => {
  try {
    const requestingUserId = req.user.userId;
    const userType = req.user.userType;
    console.log("userId: " + userId);
    console.log("userType: " + userType);

    const { addUserId, projectId, projectLead } = req.body;

    res.status(201).json({ addUserId, projectId, projectLead });
  } catch (error) {
    console.error("Failed to add User to Charity:", error);
    res.status(400).json({ error: "Failed to add User to Charity" });
  }
});

module.exports = router;
