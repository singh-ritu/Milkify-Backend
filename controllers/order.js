const milkItem = require("../models/milkItem");
const order = require("../models/order");

async function calculateTotalPrice(items) {
  let totalPrice = 0;

  for (const item of items) {
    const currentItem = await milkItem.findById(item.id);
    totalPrice += currentItem.cost * item.quantity;
  }

  return totalPrice;
}

async function handleOrderDetails(req, res) {
  const { items } = req.body;
  const totalPrice = await calculateTotalPrice(items);

  const orderDetails = new order({
    items,
    totalPrice,
  });
  console.log(req.cookies);
  await orderDetails.save();
  return res.json(orderDetails);
}

module.exports = {
  handleOrderDetails,
};
