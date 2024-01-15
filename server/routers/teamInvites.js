const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const authMiddleware = require("../middleware/JWTVerification");
const router = express.Router();
const SECRET = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

// we need these two for these
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const CLIENT_ID =
  "200256463245-kjm6anfj03f6jcotgd7eqmp65nkvia47.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "1//04BI-0GZd5EqMCgYIARAAGAQSNwF-L9Ir5kLSNCFBgm_iCxILTvlQYMoojMhKDwHce5Lh3FF2RpDfH0fqN5nZfyKZARIQVqDl-9w";
const ACCESS_TOKEN =
  "ya29.a0AfB_byAuxwUB7m2fE3XeHqBxX_V3wpnHZI_oDRB3qa2xetRrq4R7NdfPJsJwRDob79_fWxU2q81uR0nFGYPPAjxMWEFoza-vhZz0l5HdIaWohq1Xv__vV4FaiAFqNxz4fOJNp1DnOFYmwqSKW1chY7yWiDsJO-15ybj9aCgYKAcASARESFQHGX2MiO6u3A84FWUepuQ8DAJyq8g0171";

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail(email, accesstoken, link) {
  try {
    // getting access token from refresh token
    console.log("email: ", email);
    console.log("access token: ", accesstoken);
    const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invitation to Join Philanthrify Team</title>
</head>
<body>
    <h1>Invitation to Join Philanthrify Team</h1>
    <p>Hello,</p>
    <p>You have been invited to join a Philanthrify team. Click the button below to accept the invitation:</p>
    
    <a href="${link}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Accept Invitation</a>
    
    <p>If the button above doesn't work, you can also copy and paste the following link into your web browser:</p>
    <p><a href="${link}">${link}</a></p>

    <p>Thank you for joining Philanthrify!</p>
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
      subject: "Hello from Website",
      // text: "Hello world!", // can use html instead
      html: emailHtml,
    };
    const result = transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

// Add a new project for a user
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { email, charityUserType } = req.body;
    // finding the charity they belong to
    // TODO: thusfar we're assuming each user belongs to one charity, this will need to be changed later

    const user = await prisma.user.findUnique({
      where: {
        id: req.user.userId,
      },
      include: {
        charity: true,
      },
    });
    const charityId = user.charity[0].charityId;
    const token = jwt.sign(
      { email, charityUserType, charityId },
      SECRET,
      { expiresIn: "24h" } // Token expires in 24 hours
    );
    // placeholder link for now
    const invitationLink = `localhost/signup?token=${token}`;
    const accesstoken = await oAuth2Client.getAccessToken();

    console.log("trying to send email...");
    sendMail(email, accesstoken, (link = invitationLink))
      .then((result) => console.log("Email sent...", result))
      .catch((error) => console.log(error.message));
    res.status(201).json(invitationLink);
  } catch (error) {
    console.error("Failed to send invitation:", error);
    res.status(400).json({ error: "Failed to send invitation" });
  }
});

module.exports = router;
