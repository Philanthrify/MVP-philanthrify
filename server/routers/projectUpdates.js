const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const multer = require("multer");
const path = require("path");
const charityMiddleware = require("../middleware/CharityMiddleware");

router.post("/", charityMiddleware.getCharities, async (req, res) => {
  const { projectId, text } = req.body;
  // work out which charity this project is for and adding to body for
  // checking head rights:
  const project = await prisma.project.findUnique({
    where: {
      id: projectId, // Replace with the condition that identifies the project you want
    },
    select: {
      charityId: true, // Select the charityId field
    },
  });
  req.body = { ...req.body, ...project };
  console.log("req.body", req.body);

  const userId = req.user.userId;
  const projectStatus = await charityMiddleware.isProjectLeadOrReporter(
    userId,
    projectId
  );
  console.log("projectStatus", charityMiddleware.hasCharityHeadRights(req));

  if (!charityMiddleware.hasCharityHeadRights(req) && !projectStatus) {
    return res.status(403).json({ error: "Access denied" });
  }

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
