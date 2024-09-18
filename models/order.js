const mongoose = require("mongoose");
const User = require("../models/user");
const milkItem = require("./milkItem");

const orderSchema = new mongoose.Schema({
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  //   required: true,
  // },
  items: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "milkItem",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
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
