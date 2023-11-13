const express = require("express");
const printObject = require("../debug/debug");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const router = express.Router();

// Add a new project for a user
router.post("/", async (req, res) => {
  try {
    const userId = req.user.userId;
    const userType = req.user.userType;
    console.log("userId: " + userId);
    console.log("userType: " + userType);
    //  ensure userType is CHARITY
    if (userType !== "CHARITY") {
      return res
        .status(400)
        .json({ error: "User type must be 'CHARITY' to upload project." });
    }
    const {
      title,
      challenge,
      solution,
      donationUsage,
      futureImpact,
      links,
      targetAmount,
      currentAmount = 0.0, // default to 0 if not provided
    } = req.body;

    const newProject = await prisma.project.create({
      data: {
        title: title,
        challenge: challenge,
        solution: solution,
        donationUsage: donationUsage,
        futureImpact: futureImpact,
        targetAmount: Number(targetAmount),
        currentAmount: currentAmount,
        userId: userId,
      },
    });
    // create links
    links.forEach(async (element) => {
      const newLink = await prisma.link.create({
        data: {
          url: element.link,
          socialMedia: element.socialMedia,
          projectId: newProject.id,
        },
      });
    });
    res.status(201).json(newProject);
  } catch (error) {
    console.error("Failed to add project:", error);
    res.status(400).json({ error: "Failed to add project" });
  }
});

// Retrieve all projects for a user
router.get("/", async (req, res) => {
  try {
    const userId = req.user.userId;
    const projects = await prisma.project.findMany({
      where: { userId: userId },
    });
    res.status(201).json(projects);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Failed to fetch projects" });
  }
});

module.exports = router;
