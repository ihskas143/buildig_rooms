const express = require("express");
const Booking = require("../models/Booking");
const Room = require("../models/Room");
const router = express.Router();

// ✅ Book rooms
router.post("/", async (req, res) => {
  const { guestName, guestEmail, numRooms } = req.body;

  if (numRooms > 5) {
    return res.status(400).json({ error: "Max 5 rooms per booking allowed." });
  }

  try {
    // ✅ Find available rooms
    const availableRooms = await Room.find({ available: true }).sort({ floor: 1, number: 1 });

    if (availableRooms.length < numRooms) {
      return res.status(400).json({ error: "Not enough available rooms." });
    }

    // ✅ Select optimal rooms
    const selectedRooms = availableRooms.slice(0, numRooms).map(room => room.number);

    // ✅ Mark selected rooms as unavailable
    await Room.updateMany({ number: { $in: selectedRooms } }, { available: false });

    // ✅ Save booking
    const newBooking = new Booking({ guestName, guestEmail, rooms: selectedRooms, totalTravelTime: 0 });
    await newBooking.save();

    res.json({ message: "Booking successful!", bookedRooms: selectedRooms });
  } catch (error) {
    console.error("Booking Error:", error);
    res.status(500).json({ error: "Booking failed" });
  }
});

module.exports = router;
