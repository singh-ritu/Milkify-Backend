const jwt = require("jsonwebtoken");
const secret = "ritu@1507$24";

function setUser(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      name: user.name,
    },
    secret,
    { expiresIn: "30m" }
  );
}

function getUser(token) {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded; // Returns the decoded user data
  } catch (error) {
    console.error("Error verifying token:", error);
    return null; // Or handle the error differently
  }
}

module.exports = {
  setUser,
  getUser,
};
