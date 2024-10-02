const { getUser } = require("../service/auth");

async function isAuthenticated(req, res, next) {
  const sessionId = req.cookies.uuid;

  if (sessionId) {
    const user = getUser(sessionId);
    if (user) {
      req.user = user;
      return next();
    } else {
      return res.status(401).json({ error: "Unauthorized: Invalid Session " });
    }
  } else {
    return res.status(401).json({ error: "Unauthorized: No session ID found" });
  }
}
module.exports = {
  isAuthenticated,
};
