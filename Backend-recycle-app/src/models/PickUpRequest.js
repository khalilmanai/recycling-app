const mongoose = require("mongoose");

const pickUpRequestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: {
    type: [String],
    required: true,
  },
  photos: [String],
  address: {
    type: String,
    required: true,
  },
  note: String,
  quantity: {
    type: Number,
    required: true,
  },
  vehicleType: String,
  isInstant: {
    type: Boolean,
    default: false,
  },
});

const PickUpRequest = mongoose.model("PickUpRequest", pickUpRequestSchema);

module.exports = PickUpRequest;
