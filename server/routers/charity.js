const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const multer = require("multer");
const path = require("path");
const authJWT = require("../middleware/JWTVerification");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "assets/CharityAvatars");
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
router.post(
  "/upload-charity-avatar/",
  upload.single("avatar"),
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
// get information on charity, teammates from charity Id
// twice nested query to get only needed information, including only what is needed
// returns: their charity access rights, id, name, email
router.get("/:ukCharityNumber", async (req, res) => {
  try {
    const { ukCharityNumber } = req.params;

    const charity = await prisma.charity.findUnique({
      where: { ukCharityNumber: ukCharityNumber },
      select: {
        members: {
          select: {
            charityHead: true,
            user: {
              select: {
                id: true,
                firstname: true,
                lastname: true,
                email: true,
              },
            },
          },
        },
        projects: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });
    res.status(200).json(charity);
  } catch (error) {
    console.error("Failed to get charity information:", error);
    res.status(500).json({ error: "Failed to get charity information" });
  }
});
module.exports = router;
