const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const multer = require("multer");
const path = require("path");
const authJWT = require("../middleware/JWTVerification");
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');


// Configure AWS SDK
aws.config.update({
  accessKeyId: process.env.AWS_KEY_NAME,
  secretAccessKey: process.env.AWS_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

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

// Create an S3 instance
const s3 = new aws.S3();

// Configure multer-s3 to upload files directly to S3
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'philanthrify-image-testeroonie',
    acl: 'public-read', // Adjust the ACL as needed
    key: function (req, file, cb) {
      const projectId = req.query.projectId;
      const fileName = `project_${projectId}/${Date.now()}_${file.originalname}`;
      cb(null, fileName);
    },
  }),
});

router.post('/upload-charity-avatar/', upload.single('avatar'), async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    // Access the S3 URL of the uploaded file
    const s3Url = file.location;

    res.status(200).json({ message: 'File uploaded successfully.', s3Url });
  } catch (error) {
    console.error('Failed to upload image:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

//const upload = multer({ storage: storage });
//router.post(
//  "/upload-charity-avatar/",
//  upload.single("avatar"),
//  async (req, res) => {
//    try {
//      const file = req.file;
//      const projectId = req.query.projectId;
//
//      if (!file) {
//        return res.status(400).json({ error: "No file uploaded." });
//      }
//      res.status(200).json({ message: "File uploaded successfully." });
//    } catch (error) {
//      console.error("Failed to upload image:", error);
//      res.status(500).json({ error: "Failed to upload image" });
//    }
//  }
//);
// get information on charity, teammates from charity Id
// twice nested query to get only needed information, including only what is needed

// takes: params{uk charity number}, query{members:bool, projects: bool}}
// returns: their charity access rights, id, name, email
// currently called in:
// - InviteProjectMate.tsx, to get just memberships

router.get("/:ukCharityNumber", async (req, res) => {
  try {
    const { ukCharityNumber } = req.params;
    const { members, projects } = req.query;
    // add params to request
    const selectQuery = {
      ukCharityNumber: true,
      charityName: true,
      email: true,
      about: true,
    };
    if (members) {
      selectQuery["members"] = {
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
      };
    }
    if (projects) {
      selectQuery["projects"] = {
        select: {
          id: true,
          title: true,
        },
      };
    }

    console.log("🚀 ~ router.get ~ selectQuery:", JSON.stringify(selectQuery));

    const charity = await prisma.charity.findUnique({
      where: { ukCharityNumber: ukCharityNumber },
      select: selectQuery,
    });
    res.status(200).json(charity);
  } catch (error) {
    console.error("Failed to get charity information:", error);
    res.status(500).json({ error: "Failed to get charity information" });
  }
});
module.exports = router;
