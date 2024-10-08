const mongoose = require("mongoose");

const milkItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: true,
  },
  image: {
    type: String,
    required: [true, "image is required"],
  },
  isVegan: {
    type: Boolean,
    required: [true, "isVegan is required"],
  },
  description: {
    type: String,
    required: [true, "descpription is required"],
  },
  cost: {
    type: Number,
    required: [true],
  },
});

const milkItem = mongoose.model("milkItem", milkItemSchema);
module.exports = milkItem;
