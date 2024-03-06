const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET = process.env.JWT_SECRET;

// will not
const authJWT = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ error: "Token required" });
  }

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Token invalid" });
    }
    // user is returned
    req.user = decoded.user;
    console.log(`${decoded.user.id} request validated!`);
    next();
  });
};

// for cases where user information is needed if there is a token
// but untokened users can still access some information on route.

// e.g. get route for charity information gives more info if they have a token
// and are a member of said charity. Yet untokened users can be served bare
// information on this page.
const unrejectingTokenDecode = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    console.log("not token");
    req.user = null;
    return next();
  }

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      req.user = null;
      return next();
    }
    // user is returned
    req.user = decoded.user;
    console.log(`${decoded.user.id} request validated!`);
    next();
  });
};

module.exports = authJWT;
module.exports.unrejectingTokenDecode = unrejectingTokenDecode;
