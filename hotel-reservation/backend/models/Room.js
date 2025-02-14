const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  number: { type: Number, required: true, unique: true },
  floor: { type: Number, required: true },
  available: { type: Boolean, default: true }
});

const Room = mongoose.model("Room", RoomSchema);
module.exports = Room;
