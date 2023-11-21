const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createTag = async (projectId, listOfTags) => {
  let createdTags = [];
  let failureTags = [];

  for (const tagValue of listOfTags) {
    try {
      const newTag = await prisma.tag.create({
        data: {
          projectId: projectId,
          value: tagValue,
        },
      });
      createdTags.push(newTag);
    } catch (error) {
      // TODO: for now ignoring failure in tag creation
      console.error("Error creating tag: ", tagValue);
      failureTags.push(tagValue);
    }
  }
  return { createdTags: createdTags, failureTags: failureTags };
};

module.exports = { createTag };
