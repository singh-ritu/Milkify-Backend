const express = require("express");
const {
  handleUserSignUp,
  handleUserLogin,
  handleUser,
  handleUserLogOut,
} = require("../controllers/user");
const router = express.Router();

router.post("/signUp", handleUserSignUp);
router.post("/Login", handleUserLogin);
router.get("/userDetails", handleUser);
router.post("/logOut", handleUserLogOut);

module.exports = router;
