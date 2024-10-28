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
  const sessionId = req.cookies.uuid;
  console.log(sessionId);

  const user = getUser(sessionId);
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
    return res.status(403).json({ message: "User not found" });
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
