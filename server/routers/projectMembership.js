const express = require("express");
const printObject = require("../debug/debug");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const authMiddleware = require("../middleware/JWTVerification");
const { body, validationResult } = require("express-validator");

const router = express.Router();
const path = require("path");
const { getCharities } = require("../middleware/CharityMiddleware");

// adds a user to a charity project
// addUserId (the already existing user to be added to the project),
// projectId, projectLead
// needed: must be in the same charity as the project
// needed: if being added as project lead then requestingUser must be
// charity head.
router.post(
  "/",
  authMiddleware,
  body("addUserId").isString().withMessage("addUserId must be a string"),
  body("projectId").isString().withMessage("projectId must be a string"),
  body("projectLead").isBoolean().withMessage("projectLead must be a boolean"),
  async (req, res) => {
    // check for middleware errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // extracting stuff from request
      const requestingUserId = req.user.id;
      console.log("🚀 ~ router.post ~ req.user:", req.user);
      console.log("🚀 ~ router.post ~ requestingUserId:", requestingUserId);
      const { addUserId, projectId, projectLead } = req.body;

      // uphold that requester must be a charity head for this project's charity
      // work out which project this is for:
      const project = await prisma.project.findUnique({
        where: {
          id: projectId,
        },
      });
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      // Check if the user is already a member of the project
      const existingMembership = await prisma.projectMembership.findUnique({
        where: {
          userId_projectId: {
            userId: addUserId,
            projectId: projectId,
          },
        },
      });

      if (existingMembership) {
        return res
          .status(409)
          .json({ error: "User already a member of this project" });
      }

      // find the requester's charity membership
      const charityMembership = await prisma.charityMembership.findUnique({
        where: {
          userId_charityId: {
            userId: requestingUserId,
            charityId: project.charityId,
          },
        },
      });
      console.log(
        "🚀 ~ router.post ~ charityMembership.charityHead:",
        charityMembership.charityHead
      );
      // is requester a charity head?
      if (!charityMembership || charityMembership.charityHead !== true) {
        return res.status(403).json({ error: "Access denied" });
      }

      const newProjectMembership = await prisma.projectMembership.create({
        data: {
          userId: addUserId,
          projectId: projectId,
          projectLead: Boolean(projectLead),
        },
      });

      res.status(201).json(newProjectMembership);
    } catch (error) {
      console.error("Failed to add User to Charity:", error);
      res.status(400).json({ error: "Failed to add User to Charity" });
    }
  }
);
// for any specific project Id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const memberships = await prisma.projectMembership.findMany({
      where: { projectId: id },
      select: {
        projectLead: true,
        user: {
          select: { id: true, firstname: true, lastname: true, email: true },
        },
      },
    });
    // wrixling the data structure for better shape in frontend
    const transformedMemberships = memberships.map((membership) => ({
      id: membership.user.id,
      firstname: membership.user.firstname,
      lastname: membership.user.lastname,
      email: membership.user.email,
      projectLead: membership.projectLead,
    }));
    return res.status(200).json(transformedMemberships);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
