const express = require("express");

const router = express.router;

router.get("/signUp", (req, res) => {
  res.render("signUp");
});

module.exports = router;
