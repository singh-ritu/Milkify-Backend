const { getUser } = require("../service/auth");

async function isAuthenticated(req, res, next) {
  const token = req.cookies.uuid;

  if (token) {
    const user = getUser(token);
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
