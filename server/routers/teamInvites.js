const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const authMiddleware = require("../middleware/JWTVerification");
const router = express.Router();
const SECRET = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
const {
  getCharities,
  hasCharityHeadRights,
  isProjectLeadOrReporter,
} = require("../middleware/CharityMiddleware");
// we need these two for these
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const passwordMiddleware = require("../middleware/passwordUtil");
const dotenv = require("dotenv");
dotenv.config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
console.log("🚀 ~ REFRESH_TOKEN:", REFRESH_TOKEN);

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail(email, accesstoken, link, teamName) {
  try {
    // getting access token from refresh token

    const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invitation to Join Philanthrify Team</title>
</head>
<body>
    <h1>Invitation to join ${teamName}</h1>
    <p></p>
    <p>Hello, you have been invited to join a team on Philanthrify. Click the button below to accept the invitation:</p>
    <p></>
    <p></>
    <a href="${link}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Accept Invitation</a>
    <p></>
    <p></>
    <p>If the button above doesn't work, you can also copy and paste the following link into your web browser:</p>
    <p><a href="${link}">${link}</a></p>
    <p></>
    <p>This link expires in 1 week. If you do not access it within this timeframe then a new link will need to be sent. </p>
    <p></>
    <p>Thank you for joining us and we hope you enjoy our website!</p>
</body>
</html>
`;

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "smtp.philanthrify@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accesstoken,
      },
    });

    const mailOptions = {
      from: "Philanthrify 💖 <smtp.philanthrify@gmail.com>",
      to: email,
      subject: "Do not reply: Hello from Philanthrify",
      // text: "Hello world!", // can use html instead
      html: emailHtml,
    };
    const result = transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

// creating an invite link for the new user
router.post("/", authMiddleware, getCharities, async (req, res) => {
  try {
    const {
      email,
      charityHead, // also need charity Id (uk number) but not extracted here
    } = req.body;

    // check if they have the permissions for this charity
    // check access rights, needs to be a charity head for that charity
    console.log("charity access rights: ", hasCharityHeadRights(req));
    charity = hasCharityHeadRights(req); // uk charity number (or false)
    if (!charity) {
      // only charity heads can do invites
      return res
        .status(403)
        .json({ error: "Access denied: Not a charity head" });
    }

    // Todo: query db -get charity name
    const charityObj = await prisma.charity.findUnique({
      where: {
        ukCharityNumber: charity.charityId,
      },
    });
    const token = jwt.sign(
      {
        email: email,
        charityHead: charityHead,
        charityId: charity.charityId,
        charityName: charityObj.charityName,
      },
      SECRET,
      { expiresIn: "168h" } // Token expires in 24 hours
    );
    let invitationLink;

    if (process.env.NODE_ENV !== "development") {
      invitationLink = `${process.env.URL_ROOT_ADDRESS}register?token=${token}`;
    } else {
      invitationLink = `${process.env.DEV_ROOT_ADDRESS}register?token=${token}`;
    }

    // placeholder link for now TODO: need to change to getting link from .env
    const accesstoken = await oAuth2Client.getAccessToken();

    console.log("trying to send email...");
    sendMail(
      email,
      accesstoken,
      (link = invitationLink),
      (teamName = charityObj.charityName)
    )
      .then((result) => console.log("Email sent...", result))
      .catch((error) => console.log(error.message));
    res.status(201).json({ message: "Invitation send successfully!" });
  } catch (error) {
    console.error("Failed to send invitation:", error);
    res.status(500).json({ error: "Failed to send invitation" });
  }
});

//TODO - make it so if a user already exists we skip this register step and just add them to the team
router.post("/signup-with-link", async (req, res) => {
  // username is the name of the person
  const { firstname, lastname, password, token } = req.body;
  try {
    console.log("🚀 ~ router.post ~ token:", token);
    const hashedPassword = await passwordMiddleware.hashPassword(password);

    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
          reject("Token invalid");
        } else {
          resolve(decoded);
        }
      });
    });
    // Check if email already exists
    const existingEmail = await prisma.user.findUnique({
      where: {
        email: decoded.email,
      },
    });
    console.log(decoded);

    console.log("🚀 ~ router.post ~ existingEmail:", existingEmail);

    if (existingEmail) {
      let errorMessage = "";

      errorMessage += `Email: ${decoded.email} already exists.`;

      return res.status(400).json({ error: errorMessage });
    }
    // Create user data
    let userData = {
      firstname: firstname,
      lastname: lastname,
      password: hashedPassword,
      email: decoded.email,
      userType: "CHARITY", // usertype is perhaps a bit outdated
    };

    // Create charity membership data
    let charityMembershipData = {
      charityId: decoded.charityId,
      charityHead: Boolean(decoded.charityHead),
    };
    // creating the user
    const newUser = await prisma.user.create({
      data: userData,
    });

    const charityMembership = await prisma.charityMembership.create({
      data: {
        userId: newUser.id, // need this to link to crafted user
        ...charityMembershipData,
      },
    });
    return res
      .status(200)
      .json({ userData: userData, charityMembership: charityMembership });
  } catch (error) {
    console.error("Error during user signup:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
