const MilkItem = require("../models/milkItem");

async function handleMilkItem(req, res) {
  const { name, description, isVegan, cost, image } = req.body;
  const milk = new MilkItem({
    name,
    image,
    description,
    isVegan,
    cost,
  });

  await milk.save();
  return res.json(milk);
}

async function handledisplayMilkItems(req, res) {
  try {
    const milkItems = await MilkItem.find();
    res.status(200).json(milkItems);
  } catch (err) {
    res.status(500).json({ error: err.messages });
  }
}
module.exports = { handleMilkItem, handledisplayMilkItems };
