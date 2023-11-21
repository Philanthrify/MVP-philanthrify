const express = require("express");
const printObject = require("../debug/debug");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const tagMiddleware = require("../middleware/tag");

const router = express.Router();
const multer = require("multer");
const path = require("path");
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "../assets");
//   },
//   filename: (req, file, cb) => {
//     console.log(file);
//     console.log(req);
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });
// const upload = multer({ storage: storage });
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
      listOfTags,
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

    // creating the tags
    const tags = await tagMiddleware.createTag(newProject.id, listOfTags);

    res.status(201).json({
      project: newProject,
      createdTags: tags.createdTags,
    });
  } catch (error) {
    console.error("Failed to add project:", error);
    res.status(400).json({ error: "Failed to add project" });
  }
});

// Retrieve all projects for a user
router.get("/", async (req, res) => {
  try {
    const userId = req.user.userId;
    const { search, page, pageSize } = req.query;

    const pageNumber = parseInt(page) || 1;
    const size = parseInt(pageSize) || 10;
    const skip = (pageNumber - 1) * size;

    let queryOptions = {
      where: {
        OR: [
          {
            title: {
              contains: search,
            },
          },
          {
            challenge: {
              contains: search,
            },
          },
          {
            solution: {
              contains: search,
            },
          },
        ],
      },
      skip: skip,
      take: size,
    };

    // If no search term is provided, remove the OR filter
    if (!search) {
      delete queryOptions.where.OR;
    }

    const projects = await prisma.project.findMany(queryOptions);
    res.status(200).json(projects);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Failed to fetch projects" });
  }
});

module.exports = router;
