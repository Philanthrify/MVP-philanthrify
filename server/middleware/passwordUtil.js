const bcrypt = require("bcrypt");
const saltRounds = 10;

// Hash a password
async function hashPassword(password) {
  return await bcrypt.hash(password, saltRounds);
}

// Verify a password against a hash
async function verifyPassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

module.exports = {
  hashPassword,
  verifyPassword,
};
