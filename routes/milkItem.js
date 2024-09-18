const express = require("express");
const {
  handleMilkItem,
  handledisplayMilkItems,
} = require("../controllers/milkItem");

const router = express.Router();

router.post("/create-milkItem", handleMilkItem);

router.get("/get-milkItems", handledisplayMilkItems);

module.exports = router;
