const express = require("express");
const Room = require("../models/Room");
const router = express.Router();

// ✅ Get all rooms (available and booked)
router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find(); // Fetch all rooms
    res.json(rooms);
  } catch (error) {
    console.error("Error fetching rooms:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
