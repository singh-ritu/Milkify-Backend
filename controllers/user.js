const User = require("../models/user");
const { setUser, getUser } = require("../service/auth");

async function handleUserSignUp(req, res) {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
  });
  const token = setUser(user);

  res.cookie("uuid", token, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production" ? true : false,
    secure: false,
    maxAge: 3600000,
    sameSite: "none",
    path: "/",
  });
  return res.json({
    name: name,
    email: email,
    password: password,
    message: token,
  });
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({
    email,
    password,
  });
  if (!user) {
    return res.status(404).json({
      error: "No User found",
    });
  }

  const token = setUser(user);

  res.cookie("uuid", token, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production" ? true : false,
    secure: false,
    maxAge: 3600000,
    sameSite: "none",
    path: "/",
  });

  return res.json({
    user,
    message: token,
  });
}

function handleUserLogOut(req, res) {
  res.status(200).json({ message: "Successfully logged out" });
}

async function handleUser(req, res) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Not authorised" });
  }
  try {
    const user = await getUser(token);
    if (user) {
      res.json({
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  handleUserSignUp,
  handleUserLogin,
  handleUserLogOut,
  handleUser,
};
