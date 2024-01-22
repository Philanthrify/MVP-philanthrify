// checks which charity the user is
// a member of and their editing rights within that charity and the projects
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// takes the user and works out which charities they're a member of
// and which projects.
const getCharities = async (req, res, next) => {
  const userCharities = await prisma.user.findUnique({
    where: { id: req.user.id },
    include: {
      charity: true, // This will include the charities associated with the user
      projects: true,
    },
  });
  // now we add to req and can access this later
  req.charity = userCharities.charity;
  req.projects = userCharities.projects;
  next();
};

// also need a function to check if they are a project lead
// will return a charity number or false - useful for if testing
function hasCharityHeadRights(req) {
  const { charityId } = req.body;
  for (const charity of req.charity) {
    // if same charity and
    console.log(charityId, charity.charityId); // these will be actually the charity membership id
    if (charityId === charity.charityId && charity.charityHead === true) {
      return charity.charityId; // Person has access rights for this charity, continue with the next middleware or route handler
    }
  }
  // If no access rights were found, respond false
  return false;
}

// works out whether they are either a project lead or reporter for
// project in reqs
async function isProjectLeadOrReporter(userId, projectId) {
  const queryResult = await prisma.projectMembership.findUnique({
    where: {
      userId_projectId: {
        userId: userId,
        projectId: projectId,
      },
    },
  });
  if (queryResult) {
    return true;
  }
  return false;
}

module.exports = {
  getCharities,
  hasCharityHeadRights,
  isProjectLeadOrReporter,
};
