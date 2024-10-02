const express = require("express");
const {
  handleMilkItem,
  handledisplayMilkItems,
} = require("../controllers/milkItem");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.post("/create-milkItem", handleMilkItem);

router.get("/get-milkItems", handledisplayMilkItems);

module.exports = router;
