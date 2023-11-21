const express = require("express");
const router = express.Router();

const tagMiddleware = require("../middleware/tag");

// adding tag to existing project
router.post("/", async (req, res) => {
  try {
    const { projectId, listOfTags } = req.body;
    const completedActions = await tagMiddleware.createTag(
      projectId,
      listOfTags
    );
    res.status(200).json({
      message: "Tags created successfully",
      created: completedActions.createdTags,
      failedToCreate: completedActions.failureTags,
    });
  } catch (error) {
    console.error("Error during tag creation", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
