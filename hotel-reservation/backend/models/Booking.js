const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  guestName: { type: String, required: true }, 
  guestEmail: { type: String, required: true }, 
  rooms: [{ type: Number, required: true }], 
  totalTravelTime: { type: Number, required: true }, 
  bookingDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Booking", BookingSchema);
