const express = require("express");
const {
  handleOrderDetails,
  handleOrderSummary,
} = require("../controllers/order");

const router = express.Router();

router.post("/order", handleOrderDetails);
router.get("/get-order/:orderId", handleOrderSummary);

module.exports = router;
