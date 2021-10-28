const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DeviceSchema = new Schema({
  deviceID: {
    type: String,
  },

  name: {
    type: String,
  },

  description: {
    type: Schema.Types.ObjectId,
    ref: "deviceType",
  },

  area: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
});

module.exports = new mongoose.model("device", DeviceSchema);
