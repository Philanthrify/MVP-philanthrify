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
const {
  getCharities,
  hasCharityHeadRights,
  isProjectLeadOrReporter,
} = require("../middleware/CharityMiddleware");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "assets/ProjectPhotos");
  },
  filename: (req, file, cb) => {
    console.log(file);
    console.log(req);
    const projectId = req.query.projectId;
    const fileExt = path.extname(file.originalname);
    const newFilename = `${projectId}-${Date.now()}${fileExt}`;
    console.log(newFilename);

    cb(null, newFilename);
  },
});
const upload = multer({ storage: storage });
// Add a new project for a user
router.post("/", authMiddleware, getCharities, async (req, res) => {
  try {
    const userId = req.user.userId;
    const userType = req.user.userType;
    console.log("userId: " + userId);
    console.log("userType: " + userType);
    // //  ensure userType is CHARITY
    // if (userType !== "CHARITY") {
    //   return res
    //     .status(400)
    //     .json({ error: "User type must be 'CHARITY' to upload project." });
    // }
    const {
      title,
      country,
      challenge,
      solution,
      donationUsage,
      futureImpact,
      link,
      tag,
      targetAmount,
      currentAmount = 0.0, // default to 0 if not provided
      endDate,
    } = req.body;
    console.log(endDate);
    console.log("charity access rights: ", hasCharityHeadRights(req));
    // check access rights, needs to be a charity head for that charity
    const charity = hasCharityHeadRights(req); // uk charity number (or false)
    if (!charity) {
      return res.status(403).json({ error: "Access denied" });
    }

    const newProject = await prisma.project.create({
      data: {
        title: title,
        country: country,
        challenge: challenge,
        solution: solution,
        donationUsage: donationUsage,
        futureImpact: futureImpact,
        targetAmount: Number(targetAmount),
        currentAmount: currentAmount,
        charityId: charity.charityId, // actual charity ID here
        endDate: endDate, // comes out as ISO 8641 which is compat with figma
      },
    });
    console.log(link);
    // create links
    link.forEach(async (element) => {
      const newLink = await prisma.link.create({
        data: {
          webLink: element.webLink,
          socialMedia: element.socialMedia,
          projectId: newProject.id,
        },
      });
    });

    // creating the tags
    const tags = await tagMiddleware.createTag(newProject.id, tag);

    res.status(201).json({
      project: newProject,
      createdTags: tags.createdTags,
    });
  } catch (error) {
    console.error("Failed to add project:", error);
    res.status(400).json({ error: "Failed to add project" });
  }
});

// Explore page searchbar
router.post("/search", async (req, res) => {
  try {
    const { search } = req.query;
    const { country, listOfTags } = req.body;
    console.log(country, listOfTags);
    // const { listOfTags } = req.body;

    let queryOptions = {
      where: {
        AND: [], // Initialize an empty AND array
      },
      include: {
        link: true, // Include associated links
        tag: true, // Include associated links
      },
    };

    // Dynamically build the search part of the query if search term is provided
    if (search) {
      queryOptions.where.AND.push({
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
      });
    }

    // Include country in the query if it's provided
    if (country) {
      queryOptions.where.AND.push({
        country: {
          contains: country,
        },
      });
    }
    // Add tag filter
    if (listOfTags && listOfTags.length > 0) {
      queryOptions.where.AND.push({
        tag: {
          some: { value: { in: listOfTags } },
        },
      });
    }

    // Remove the AND filter if it's empty
    if (queryOptions.where.AND.length === 0) {
      delete queryOptions.where.AND;
    }
    const projects = await prisma.project.findMany(queryOptions);

    res.status(200).json(projects);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Failed to fetch projects" });
  }
});

router.post(
  "/upload-project-image/",
  upload.single("image"),
  async (req, res) => {
    try {
      const file = req.file;
      const projectId = req.query.projectId;

      if (!file) {
        return res.status(400).json({ error: "No file uploaded." });
      }
      res.status(200).json({ message: "File uploaded successfully." });
    } catch (error) {
      console.error("Failed to upload image:", error);
      res.status(500).json({ error: "Failed to upload image" });
    }
  }
);

// Retrieve project info (just one)
router.get("/:id", async (req, res) => {
  try {
    // project id
    // TODO: searching by charity
    const { id } = req.params;
    console.log(id);

    // Construct query options with dynamic conditions and includes
    let queryOptions = {
      where: { id: id },
      include: {
        link: true,
        tag: true,
        updates: true,
        members: true,
        charity: true,
        transactions: true,
      },
    };

    // Fetch projects based on the constructed query
    const projects = await prisma.project.findUnique(queryOptions);
    if (projects) {
      res.status(200).json(projects);
    } else {
      res.status(404).json({ error: "Failed to find project(s)" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch project(s)" });
  }
});

// gets the projects which the user has rights to
// Retrieve full project information (CRUD) - TODO: currently only works for charity heads
router.get("/", authMiddleware, getCharities, async (req, res) => {
  try {
    // project id
    // TODO: searching by charity
    const userCharities = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: {
        charity: true, // This will include the charities associated with the user
        projects: true, // TODO: This will include the projects associated with the user
      },
    });
    // filter out the ones where the user isn't charity head
    const userCharitiesWhereHead = userCharities.charity.filter(
      (charity) => charity.charityHead
    );
    // Extract charityIds from the filtered charities
    const charityIds = userCharitiesWhereHead.map(
      (charity) => charity.charityId
    );
    console.log("charityIds", charityIds);

    // Construct query options with dynamic conditions
    const queryOptions = {
      where: {
        // Use the `in` operator to match any of the charity IDs
        charityId: { in: charityIds },
      },
    };

    // Fetch projects based on the constructed query
    const projects = await prisma.project.findMany(queryOptions);
    if (projects) {
      res.status(200).json(projects);
    } else {
      res.status(404).json({ error: "Failed to find project(s)" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch project(s)" });
  }
});
module.exports = router;
