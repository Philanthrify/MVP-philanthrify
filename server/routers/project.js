const express = require("express");
const printObject = require("../debug/debug");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const tagMiddleware = require("../middleware/tag");
const authMiddleware = require("../middleware/JWTVerification");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET = process.env.JWT_SECRET;
const router = express.Router();
const multer = require("multer");
const path = require("path");
const dayjs = require("dayjs");
const { body, validationResult } = require("express-validator");
const {
  getCharities,
  hasCharityHeadRights,
  isProjectLeadOrReporter,
} = require("../middleware/CharityMiddleware");
const { FindInputErrors } = require("../middleware/FindInputErrors");

const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { allowedTagValues } = require("../models/tags");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true, //remove for localhost testing
});

// Update Multer configuration to use Cloudinary storage
const storageMain = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "project_images/main",
    allowedFormats: ["jpg", "png", "jpeg"],
    public_id: function (req) {
      console.log("🚀 ~ req.query.projectId:", req.query.projectId);
      return req.query.projectId;
    },
  },
});
const uploadMain = multer({ storage: storageMain });
// Validation laws
const validateProject = [
  body("title")
    .isLength({ max: 191 })
    .withMessage("Inputs must be under 191 characters"),
  body("country")
    .isLength({ max: 191 })
    .withMessage("Country must be under 191 characters"),
  body("subtitle")
    .isLength({ max: 191 })
    .withMessage("Subtitle must be under 191 characters"),
  // checking longer strings
  body("backgroundAndGoals")
    .isLength({ max: 8000 })
    .withMessage("Background and Goals must be under 8000 characters"),

  body("soluion")
    .isLength({ max: 8000 })
    .withMessage("Solution must be under 8000 characters"),
  body("donationUsage")
    .isLength({ max: 8000 })
    .withMessage("Donation Usage must be under 8000 characters"),

  // Validator for link array
  body("link.*.weblink")
    .optional({ checkFalsy: true })
    .isLength({ max: 2084 })
    .withMessage("Web link must be under 2084 characters")
    .matches(
      /^(https?|ftp):\/\/(([a-z\d]([a-z\d-]*[a-z\d])?\.)+[a-z]{2,}|localhost)(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i
    )
    .withMessage("Web link is not in the correct format."),
  body("link.*.socialMedia")
    .optional({ checkFalsy: true })
    .isString()
    .withMessage("Social media name must be a string")
    .isIn(["Facebook", "Instagram", "Twitter", "LinkedIn", "YouTube"])
    .withMessage(
      "Social media must be one of the specified values: Facebook, Instagram, Twitter, LinkedIn, YouTube"
    ),
  body("tag")
    .optional({ checkFalsy: true })
    .isArray()
    .custom((tag) => {
      return tag.every((indTag) => allowedTagValues.includes(indTag));
    }),
  body("targetAmount")
    .isFloat({ min: 0 })
    .withMessage("Amount must be non-negative"),
  body("endDate")
    .isISO8601()
    .withMessage("End date must be a valid ISO 8601 date")
    .custom((value, { req }) => {
      const startDate = new Date();
      const endDate = new Date(value);
      const oneWeekLater = new Date(
        startDate.getTime() + 7 * 24 * 60 * 60 * 1000
      ); // Add 7 days to startDate

      if (endDate <= oneWeekLater) {
        throw new Error(
          "End date must be at least one week beyond the start date"
        );
      }

      // Indicates the success of this synchronous custom validator
      return true;
    }),
];
// Add a new project for a user
router.post(
  "/",
  authMiddleware,
  validateProject,
  FindInputErrors,
  getCharities,
  async (req, res) => {
    try {
      const userId = req.user.userId;
      const userType = req.user.userType;
      const {
        title,
        country,
        backgroundAndGoals,
        solution,
        donationUsage,
        subtitle,
        link,
        tag,
        targetAmount,
        currentAmount = 0.0, // default to 0 if not provided
        endDate,
        charityId,
      } = req.body;

      // Query the database to check if the charityId exists
      // TODO: consider using caching to make this query unneeded
      const charityExists = await prisma.charity.findUnique({
        where: {
          ukCharityNumber: charityId.toString(),
        },
      });

      if (!charityExists) {
        // If the charity does not exist, return an error response
        return res.status(404).json({ error: "Charity not found" });
      }
      //console.log(endDate);
      //console.log("charity access rights: ", hasCharityHeadRights(req));
      // check access rights, needs to be a charity head for that charity
      const charity = hasCharityHeadRights(req); // uk charity number (or false)
      if (!charity) {
        return res.status(403).json({ error: "Access denied" });
      }

      const newProject = await prisma.project.create({
        data: {
          title: title,
          country: country,
          backgroundAndGoals: backgroundAndGoals,
          solution: solution,
          donationUsage: donationUsage,
          subtitle: subtitle,
          targetAmount: Number(targetAmount),
          currentAmount: currentAmount,
          charityId: charity.charityId, // actual charity ID here
          endDate: endDate, // comes out as ISO 8641 which is compat with figma
        },
      });
      console.log(link);
      // create links
      const newLinkList = [];
      link.forEach(async (element) => {
        const newLink = await prisma.link.create({
          data: {
            weblink: element.weblink,
            socialMedia: element.socialMedia,
            projectId: newProject.id,
          },
        });
        newLinkList.push(newLink);
      });

      // creating the tags
      const tags = await tagMiddleware.createTag(newProject.id, tag);

      res.status(201).json({
        project: newProject,
        createdTags: tags.createdTags,
        newLinks: newLinkList,
      });
    } catch (error) {
      console.error("Failed to add project:", error);
      res.status(400).json({ error: "Failed to add project" });
    }
  }
);

// TODO: put request to edit one project for now anyone can do so
router.put(
  "/:projectId", //authMiddleware,
  async (req, res) => {
    // TODO: check if they can edit this project, for now only charity heads
    // if (!canEditProject(userId, projectId)) {
    //   return res.status(403).json({ error: "Access denied" });
    // }

    const { projectId } = req.params;

    const {
      title,
      country,
      backgroundAndGoals,
      solution,
      donationUsage,
      subtitle,
      endDate,
      // Other fields except currentAmount
    } = req.body;
    try {
      const updatedProject = await prisma.project.update({
        where: {
          id: projectId,
        },
        data: {
          title,
          country,
          backgroundAndGoals,
          solution,
          donationUsage,
          subtitle,
          endDate,
        },
      });

      res.status(200).json({
        message: "Project updated successfully",
        project: updatedProject,
      });
    } catch (error) {
      console.error("Failed to add project:", error);
      res.status(500).json({ error: "Failed to add project" });
    }
  }
);

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
            backgroundAndGoals: {
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
  uploadMain.single("image"),
  async (req, res) => {
    try {
      const file = req.file;
      console.log("🚀 ~ file:", file);
      const projectId = req.query.projectId;

      if (!file) {
        return res.status(400).json({ error: "No file uploaded." });
      }
      //const result = await cloudinary.uploader.upload(req.file.path, {folder: "project_images/main", filename: projectId});
      //console.log("🚀 ~ projectId:", projectId)

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
    //
    const token = req.headers["authorization"];
    if (token) {
      // withdrawing userId to test if this user is a project member
      const decoded = await verifyToken(token);
      const userId = decoded.user.id;
      const theirProjectMembership = projects.members.find(
        (object) => object.userId === userId
      );
      // if they are a
      if (theirProjectMembership) {
        if (theirProjectMembership.projectLead) {
          projects.membershipBool = "ProjectLead";
        } else {
          projects.membershipBool = "ProjectWorker";
        }
      }

      // // check if requesting user is a "project lead" on this project (only if token provided)
      // return res.status(200).json(foundObject);
    }
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
const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      resolve(decoded);
    });
  });
};

// gets the projects which the user has rights to
// Retrieve full project information (CRUD) - TODO: currently only works for charity heads
router.get("/", authMiddleware, getCharities, async (req, res) => {
  try {
    console.log("🚀 ~ router.get ~ req.user.id:", req.user.id);
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
    // const userCharitiesWhereHead = userCharities.charity.filter(
    //   (charity) => charity.charityHead
    // );
    // Extract charityIds from the filtered charities
    const charityIds = userCharities.charity.map(
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
