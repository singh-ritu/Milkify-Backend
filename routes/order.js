const express = require("express");
const { handleOrderDetails } = require("../controllers/order");

const router = express.Router();

router.post("/order", handleOrderDetails);

module.exports = router;
