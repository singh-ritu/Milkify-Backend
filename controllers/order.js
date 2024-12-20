const milkItem = require("../models/milkItem");
const order = require("../models/order");
const { getUser } = require("../service/auth");

async function calculateTotalPrice(items) {
  let totalPrice = 0;

  for (const item of items) {
    const currentItem = await milkItem.findById(item.milkItemId);
    totalPrice += currentItem.cost * item.quantity;
  }

  return totalPrice;
}

async function handleOrderDetails(req, res) {
  const { items } = req.body;
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token);

  const user = getUser(token);
  const totalPrice = await calculateTotalPrice(items);
  if (user) {
    const orderDetails = new order({
      userName: user.name,
      items,
      totalPrice,
    });
    await orderDetails.save();
    return res.json(orderDetails);
  } else {
    return res.status(401).json({ message: "User not found" });
  }
}

async function handleOrderSummary(req, res) {
  const orderId = req.params.orderId;
  try {
    const currOrder = await order.findById(orderId);
    if (!currOrder) {
      throw new Error("Order not found");
    }
    res.json(currOrder);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ error: "Failed to fetch order" });
  }
}

module.exports = {
  handleOrderDetails,
  handleOrderSummary,
};
