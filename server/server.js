const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const { PrismaClient } = require("@prisma/client");
const authMiddleware = require("./middleware/JWTVerification");
const path = require("path"); // Changed from 'import' to 'require'

dotenv.config();

// Initialize Express app
const app = express();
const prisma = new PrismaClient();

// Middlewares
app.use(helmet()); // Helps set some security headers
app.use(
  cors({
    origin: "*",
  })
); // Enable CORS for all routes
app.use(bodyParser.json()); // Parses incoming requests with JSON payloads
app.use(bodyParser.urlencoded({ extended: false })); // Parses incoming requests with URL-encoded payloads
app.use(morgan("dev")); // Logs incoming requests

if (process.env.NODE_ENV !== "development") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
}

// importing all endpoints from routes
// all below auth route require token
const authenticationRoutes = require("./routers/authentication");
app.use("/auth", authenticationRoutes);

// projects
const projectRoutes = require("./routers/project");
app.use("/project", projectRoutes);

const teamInvitesRoutes = require("./routers/teamInvites");
app.use("/team-invite", teamInvitesRoutes);
// all routes chronologically below this are protected by authentication

const tagRoutes = require("./routers/tag");
app.use("/tag", tagRoutes);

const charityRoutes = require("./routers/charity");
app.use("/charity", charityRoutes);
const projectUpdateRoutes = require("./routers/projectUpdates");
app.use("/projectUpdate", projectUpdateRoutes);

const transactionRoutes = require("./routers/transaction");
app.use("/transaction", transactionRoutes);

const projectMembershipRoutes = require("./routers/projectMembership");
app.use("/project-membership", projectMembershipRoutes);

app.use("/project-photo", express.static("assets/projectPhotos"));

if (process.env.NODE_ENV !== "development") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
}

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT} in ${process.env.NODE_ENV} mode`
  );
});
