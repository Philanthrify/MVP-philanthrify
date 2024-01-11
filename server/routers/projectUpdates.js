const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const multer = require("multer");
const path = require("path");

router.post("/", async (req, res) => {
  const { userId, projectId, text } = req.body;
  try {
    const update = await prisma.projectUpdate.create({
      data: {
        userId: userId,
        projectId: projectId,
        text: text,
      },
    });

    res.status(200).json({ message: "Update created successfully." });
  } catch (error) {
    console.error("Failed to add update:", error);
    res.status(500).json({ error: "Failed to add update" });
  }
});

module.exports = router;
