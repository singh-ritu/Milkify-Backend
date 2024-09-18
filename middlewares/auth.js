const { getUser } = require("../service/auth");

async function onlyLoggedInUser(req, res, next) {
  const sessionId = req.cookies.uuid;
  if (sessionId) {
    console.log("sessionId found:", sessionId);
    return next();
  } else {
    return res.status(401).json({ error: "Unauthorized: No session ID found" });
  }
}
module.exports = {
  onlyLoggedInUser,
};
