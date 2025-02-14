import React, { useState, useEffect } from "react";
import axios from "axios";

const RoomBooking = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    name: "",
    email: "",
    date: "",
  });

  // Fetch rooms from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/rooms") // Ensure backend is running
      .then((res) => setRooms(res.data))
      .catch((err) => console.error("Error fetching rooms:", err));
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setBookingDetails({ ...bookingDetails, [e.target.name]: e.target.value });
  };

  // Book a room
  const bookRoom = async () => {
    if (!selectedRoom) {
      alert("Please select a room!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/book", {
        roomId: selectedRoom, // Send room number instead of _id
        guestName: bookingDetails.name,
        guestEmail: bookingDetails.email,
        date: bookingDetails.date,
      });

      alert(res.data.message);
    } catch (error) {
      console.error("Booking error:", error.response?.data || error.message);
      alert(error.response?.data?.error || "Booking failed!");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Room Booking</h1>

      {/* Room selection dropdown */}
      <select
        className="border p-2 mb-4 w-full"
        onChange={(e) => setSelectedRoom(e.target.value)}
      >
        <option value="">Select a Room</option>
        {rooms.map((room) => (
          <option key={room._id} value={room.number}>
            Room {room.number} - Floor {room.floor} 
          </option>
        ))}
      </select>

      {/* Booking details */}
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        className="border p-2 w-full mb-2"
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        className="border p-2 w-full mb-2"
        onChange={handleChange}
      />
      <input
        type="date"
        name="date"
        className="border p-2 w-full mb-2"
        onChange={handleChange}
      />

      <button
        onClick={bookRoom}
        className="bg-blue-500 text-white p-2 w-full mt-2"
      >
        Book Room
      </button>
    </div>
  );
};

export default RoomBooking;
