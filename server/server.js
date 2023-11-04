const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const { PrismaClient } = require("@prisma/client");
const authMiddleware = require("./middleware/JWTVerification");

dotenv.config();

// Initialize Express app
const app = express();
const prisma = new PrismaClient();

// Middlewares
app.use(helmet()); // Helps set some security headers
app.use(
  cors({
    origin: "http://localhost:5173", // frontend's URL
    credentials: true, // this is important for sending cookies
  })
); // Enable CORS for all routes
app.use(bodyParser.json()); // Parses incoming requests with JSON payloads
app.use(bodyParser.urlencoded({ extended: false })); // Parses incoming requests with URL-encoded payloads
app.use(morgan("dev")); // Logs incoming requests

// importing all endpoints from routes
// all below auth route require token
const authenticationRoutes = require("./routers/authentication");
app.use("/auth", authenticationRoutes);

// all routes chronologically below this are protected by authentication
app.use(authMiddleware);

const investmentRoutes = require("./routers/investment");
app.use("/investment", investmentRoutes);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
