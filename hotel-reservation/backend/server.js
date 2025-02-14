const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const roomRoutes = require("./routes/roomRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const Room = require("./models/Room");  // Import Room model
const Booking = require("./models/Booking");  // Import Booking model

dotenv.config();
connectDB();



const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
    res.send("Server is running!");
});
app.use("/api/rooms", roomRoutes);
app.use("/api/book", bookingRoutes);

// Add rooms (POST instead of GET)
app.post("/api/addRooms", async (req, res) => {
    try {
        const rooms = [
            { number: 101, floor: 1, available: true },
            { number: 102, floor: 1, available: true },
            { number: 103, floor: 1, available: true }
        ];
        await Room.insertMany(rooms);
        res.json({ message: "Rooms added successfully" });
    } catch (err) {
        console.error("❌ Error adding rooms:", err);
        res.status(500).json({ error: "Error adding rooms" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
