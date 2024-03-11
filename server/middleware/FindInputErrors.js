const { body, validationResult } = require("express-validator");

const FindInputErrors = (req, res, next) => {
  const errors = validationResult(req);
  console.log("🚀 ~ FindInputErrors ~ errors:", errors.array()[0]);
  // only send one error back
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array()[0]);
  }
  next();
};

module.exports = {
  FindInputErrors,
};
