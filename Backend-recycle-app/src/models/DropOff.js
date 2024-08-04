const mongoose = require("mongoose");

const dropOffSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: {
    type: [String],
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

const DropOff = mongoose.model("DropOff", dropOffSchema);

module.exports = DropOff;
