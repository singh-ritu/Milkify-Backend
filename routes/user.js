const express = require("express");
const {
  handleUserSignUp,
  handleUserLogin,
  handleUser,
} = require("../controllers/user");
const router = express.Router();

router.post("/signUp", handleUserSignUp);
router.post("/Login", handleUserLogin);
router.get("/userDetails", handleUser);

module.exports = router;
