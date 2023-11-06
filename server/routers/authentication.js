const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const router = express.Router();
const passwordMiddleware = require("../middleware/passwordUtil");
const SECRET = process.env.JWT_SECRET;

router.post("/signup", async (req, res) => {
  const { username, password, email, userType } = req.body;

  // Basic validation including userType
  if (!username || !password || !email || !userType) {
    return res.status(400).json({
      error: "Username, password, email, and user type are required.",
    });
  }
  // Additional validation to ensure userType is either DONOR or CHARITY
  if (userType !== "DONOR" && userType !== "CHARITY") {
    return res
      .status(400)
      .json({ error: "User type must be either 'DONOR' or 'CHARITY'." });
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
    console.log("existingEmail: " + existingEmail);
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
        userType: userType,
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
  res.json({ token: token, username: user.username });
});
module.exports = router;
