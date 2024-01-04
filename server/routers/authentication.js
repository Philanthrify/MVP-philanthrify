const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const router = express.Router();
const passwordMiddleware = require("../middleware/passwordUtil");
const SECRET = process.env.JWT_SECRET;

router.post("/signup-donor", async (req, res) => {
  const { username, password, email } = req.body;

  // Basic validation including userType
  if (!username || !password || !email) {
    return res.status(400).json({
      error: "Username, password, email are required.",
    });
  }

  try {
    // Check if username and email already exist
    const existingUname = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    const existingEmail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    // logic to return what already exists
    if (existingUname || existingEmail) {
      let errorMessage = "";

      errorMessage += existingUname ? "Username" : "";
      errorMessage += existingUname && existingEmail ? " and " : "";
      errorMessage += existingEmail ? "Email" : "";

      errorMessage += " already exists.";

      return res.status(400).json({ error: errorMessage });
    }
    // Create user (hash password)
    const hashedPassword = await passwordMiddleware.hashPassword(password);
    const user = await prisma.user.create({
      data: {
        username: username,
        password: hashedPassword,
        email: email,
        userType: "DONOR",
      },
    });
    res
      .status(201)
      .json({ id: user.id, username: user.username, email: user.email });
  } catch (error) {
    console.error("Error during user signup:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

router.post("/signup-charity", async (req, res) => {
  // username is the name of the person
  const { username, password, email, ukCharityNumber, charityName } = req.body;

  // Basic validation including userType
  if (!username || !password || !email || !ukCharityNumber || !charityName) {
    return res.status(400).json({
      error:
        "Username, password, email, ukCharityNumber, and charityName are all required.",
    });
  }
  const charityData = {
    charityName: charityName,
    email: email,
    ukCharityNumber: Number(ukCharityNumber),
  };
  const hashedPassword = await passwordMiddleware.hashPassword(password);
  const userData = {
    username: username,
    password: hashedPassword,
    email: email,
    userType: "CHARITY", // usertype is perhaps a bit outdated
  };

  try {
    // Check if username and email already exist
    const existingNumber = await prisma.charity.findUnique({
      where: {
        ukCharityNumber: Number(ukCharityNumber),
      },
    });
    const existingEmail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    // logic to return what already exists
    // TODO: also check for username
    if (existingNumber || existingEmail) {
      let errorMessage = "";

      errorMessage += existingNumber
        ? `Charity Number: ${ukCharityNumber}`
        : "";
      errorMessage += existingNumber && existingEmail ? " and " : "";
      errorMessage += existingEmail ? `Email: ${email}` : "";
      errorMessage += " already exists.";

      return res.status(400).json({ error: errorMessage });
    }

    const newUser = await prisma.user.create({
      data: {
        username: username,
        password: hashedPassword,
        email: email,
        userType: "CHARITY",
      },
    });

    // Create user (hash password)
    const charity = await prisma.charity.create({
      data: {
        ...charityData,
        members: {
          create: {
            userId: newUser.id,
          },
        },
      },
    });
    res.status(201).json({
      newUser: newUser,
      newCharity: charity,
    });
  } catch (error) {
    console.error("Error during user signup:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) {
    return res.status(401).json({ error: "Invalid username or password" });
  }
  // check password
  const isPasswordValid = await passwordMiddleware.verifyPassword(
    password,
    user.password
  );
  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid username or password" });
  }
  // user is returned with a json web token
  const token = jwt.sign(
    { userType: user.userType, userId: user.id, username: user.username },
    SECRET,
    {
      expiresIn: "1h",
    }
  );
  res.json({ token: token, username: user.username, email: user.email });
});
module.exports = router;
