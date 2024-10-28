const User = require("../models/user");
const { setUser, getUser } = require("../service/auth");

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
    sameSite: "None",
    path: "/",
  });

  return res.json({
    user,
    message: "Token created:" + token,
  });
}

async function handleUser(req, res) {
  console.log(req.cookies);

  const token = req.cookies.uuid;

  if (!token) {
    return res.status(401).json({ message: "Not authorised" });
  }
  const user = getUser(token);
  if (user) {
    res.json({
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(404).json({ message: "user not found" });
  }
}

module.exports = { handleUserSignUp, handleUserLogin, handleUser };
