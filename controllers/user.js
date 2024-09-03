const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth");

async function handleUserSignUp(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.json({
    name: name,
    email: email,
    password: password,
  });
}

async function handleUserLogin(req, res) {
  const { name, password } = req.body;
  const user = await User.findOne({
    name,
    password,
  });
  console.log("user", user);
  if (!user) {
    res.render({
      error: "No User found",
    });
  }
  const sessionId = uuidv4();
  setUser(sessionId, user);
  res.cookie("uuid", sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 3600000,
  });
  return res.json({
    name: name,
    password: password,
  });
}

module.exports = { handleUserSignUp, handleUserLogin };
