const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const multer = require("multer");
const path = require("path");
const authMiddleware = require("../middleware/JWTVerification");
const { unrejectingTokenDecode } = require("../middleware/JWTVerification");
const { body, validationResult } = require("express-validator");
const { FindInputErrors } = require("../middleware/FindInputErrors");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");

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
    bucket: "philanthrify-image-testeroonie",
    acl: "public-read", // Adjust the ACL as needed
    key: function (req, file, cb) {
      const projectId = req.query.projectId;
      const fileName = `project_${projectId}/${Date.now()}_${
        file.originalname
      }`;
      cb(null, fileName);
    },
  }),
});

router.post(
  "/upload-charity-avatar/",
  upload.single("avatar"),
  async (req, res) => {
    try {
      const file = req.file;

      if (!file) {
        return res.status(400).json({ error: "No file uploaded." });
      }

      // Access the S3 URL of the uploaded file
      const s3Url = file.location;

      res.status(200).json({ message: "File uploaded successfully.", s3Url });
    } catch (error) {
      console.error("Failed to upload image:", error);
      res.status(500).json({ error: "Failed to upload image" });
    }
  }
);

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

router.get("/:ukCharityNumber", unrejectingTokenDecode, async (req, res) => {
  try {
    let userId;
    if (req.user) {
      userId = req.user.id;
    } else {
      userId = null;
    }

    const { ukCharityNumber } = req.params;
    const { members, projects } = req.query;
    // add params to request
    const selectQuery = {
      ukCharityNumber: true,
      charityName: true,
      email: true,
      about: true,
      reachOutEmail: true,
      foundedDate: true,
      membershipConfirmed: true,
      membershipConfirmedDateTime: true,
      tagline: true,
      tags: true,
      countriesActive: true,
    };

    // always want to check membership of project but won't always send it
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
    if (projects) {
      selectQuery["projects"] = {
        select: {
          id: true,
          title: true,
          country: true,
          targetAmount: true,
          currentAmount: true,
        },
      };
    }

    console.log("🚀 ~ router.get ~ selectQuery:", JSON.stringify(selectQuery));

    const charity = await prisma.charity.findUnique({
      where: { ukCharityNumber: ukCharityNumber },
      select: selectQuery,
    });
    if (!charity) {
      return res.status(404).json({
        error: "Charity not found",
        message: `A charity with the UK Charity Number ${ukCharityNumber} could not be found.`,
      });
    }
    console.log("🚀 ~ router.get ~ userId:", userId);
    console.log(
      "🚀 ~ router.get ~  !isHeadById(charity.members, userId):",
      !isHeadById(charity.members, userId)
    );

    // check whether user is allowed to edit the charity - ie are they a charity lead
    if (!userId && !isHeadById(charity.members, userId)) {
      charity.requesterCharityHead = false;
    } else {
      charity.requesterCharityHead = true;
    }

    // if not requested remove memberships if not requested
    // also even if requested, non-charity members cannot see charity members
    if (userId) {
      if (!members || !isCharityMember(charity.members, userId)) {
        delete charity.members;
      }
    }

    res.status(200).json(charity);
  } catch (error) {
    console.error("Failed to get charity information:", error);
    res.status(500).json({ error: "Failed to get charity information" });
  }
});

const allowedTagValues = [
  "Farming",
  "Wildlife",
  "Business",
  "Climate",
  "Community",
  "Crisis",
  "Culture",
  "Development",
  "Economy",
  "Energy",
  "Environment",
  "Food",
  "Healthcare",
  "Housing",
  "HumanRights",
  "Innovation",
  "Medical",
  "Security",
  "Sports",
  "Technology",
  "Women",
  "Youth",
  "Rewilding",
  "ElderCare",
  "Education",
  "CleanWater",
];
// writing route to add change stuff within a charity e.g. add 'about'
router.put(
  "/:ukCharityNumber",
  authMiddleware,
  body("charityName").optional({ checkFalsy: true }).isString().trim(),
  body("email").optional({ checkFalsy: true }).isEmail().normalizeEmail(),
  body("about").optional({ checkFalsy: true }).isString().trim(),
  body("reachOutEmail")
    .optional({ checkFalsy: true })
    .isEmail()
    .normalizeEmail(),
  // Validate tags as an optional array of strings, each being part of the allowed enum
  body("tags")
    .optional({ checkFalsy: true })
    .isArray()
    .custom((tags) => {
      return tags.every((tag) => allowedTagValues.includes(tag));
    }),
  FindInputErrors,

  async (req, res) => {
    const { ukCharityNumber } = req.params;

    const {
      charityName,
      email,
      about,
      reachOutEmail,
      foundedDate,
      membershipConfirmed,
      membershipConfirmedDateTime,
      tagline,
      tags,
      countriesActive,
      // Other fields except currentAmount
    } = req.body;

    try {
      // checking whether the requesting user is a head of said charity
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
        },
      });

      const userId = req.user.id;
      // if not a charity head then they are forbidden
      if (!isHeadById(charity.members, userId)) {
        return res.status(403).json({
          message:
            "You're forbidden to edit this charity since you're not a charity head",
        });
      }
      const updatedCharity = await prisma.charity.update({
        where: {
          ukCharityNumber: ukCharityNumber,
        },
        data: {
          charityName,
          email,
          about,
          reachOutEmail,
          foundedDate,
          membershipConfirmed,
          membershipConfirmedDateTime,
          tagline,
        },
      });
      console.log(updatedCharity);
      const result = await prisma.$transaction(async (prisma) => {
        // check whether the user is a charity head

        if (tags) {
          const existingTags = await prisma.charityTag.findMany({
            where: { charityId: ukCharityNumber },
            select: { value: true },
          });
          // Convert existingTags to an array of values for easier comparison
          const existingTagValues = existingTags.map((tag) => tag.value);

          // Determine tags to add (present in newTags but not in existingTagValues)
          const tagsToAdd = tags.filter(
            (tag) => !existingTagValues.includes(tag)
          );
          // Determine tags to remove (present in existingTagValues but not in newTags)
          const tagsToRemove = existingTagValues.filter(
            (tag) => !tags.includes(tag)
          );

          // Add new tags
          await Promise.all(
            tagsToAdd.map((tagValue) =>
              prisma.charityTag.create({
                data: {
                  charityId: ukCharityNumber,
                  value: tagValue,
                },
              })
            )
          );

          // Remove tags that are not in the new list
          await Promise.all(
            tagsToRemove.map((tagValue) =>
              prisma.charityTag.deleteMany({
                where: {
                  charityId: ukCharityNumber,
                  value: tagValue,
                },
              })
            )
          );
        }
        // countries adding/undoing
        if (countriesActive) {
          const existingCountries = await prisma.charityCountry.findMany({
            where: { charityId: ukCharityNumber },
            select: { value: true },
          });
          // Convert existing ones to an array of values for easier comparison
          const existingCountriesActive = existingCountries.map(
            (country) => country.value
          );

          // Determine countries to add (present in new countriesActive but not in existingCountriesActive)
          const countriesToAdd = countriesActive.filter(
            (countries) => !existingCountriesActive.includes(countries)
          );
          // Determine countriess to remove (present in existingCountriesActive but not in newcountriess)
          const countriesToRemove = existingCountriesActive.filter(
            (countries) => !countriesActive.includes(countries)
          );

          // Add new countries
          await Promise.all(
            countriesToAdd.map((countryValue) =>
              prisma.charityCountry.create({
                data: {
                  charityId: ukCharityNumber,
                  value: countryValue,
                },
              })
            )
          );

          // Remove countries that are not in the new list
          await Promise.all(
            countriesToRemove.map((countryValue) =>
              prisma.charityCountry.deleteMany({
                where: {
                  charityId: ukCharityNumber,
                  value: countryValue,
                },
              })
            )
          );
        }
      });
      res.status(200).json({
        message: "Charity updated successfully",
        result: result,
      });
    } catch (error) {
      console.error("Failed to add project:", error);
      res.status(500).json({ error: "Failed to add project" });
    }
  }
);

// takes:
// members of charity, e.g. { members: [{id: 1, head: false}, {id: 2, head: true}]
// id of bloke you want to check if they are charity head
function isHeadById(members, id) {
  const member = members.find((member) => member.user.id === id);
  // console.log("member.charityHead", member.charityHead);
  return member ? member.charityHead : false;
}

function isCharityMember(members, id) {
  const member = members.find((member) => member.user.id === id);
  return member ? true : false;
}
module.exports = router;
