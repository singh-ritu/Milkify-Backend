const express = require("express");
const { handleUserSignUp, handleUserLogin } = require("../controllers/user");
const router = express.Router();

router.post("/signUp", handleUserSignUp);
router.post("/Login", handleUserLogin);

module.exports = router;
