const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userName: {
    type: String,
    ref: "User",
    required: true,
  },
  items: [
    {
      milkItemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "milkItem",
        required: true,
      },
      itemName: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      itemCost: {
        type: Number,
        required: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
});

const order = mongoose.model("order", orderSchema);
module.exports = order;
