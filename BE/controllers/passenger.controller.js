const db = require("../models");
const Passenger = db.Passenger;

// Tạo hành khách mới
exports.createPassenger = async (req, res) => {
    try {
        const { name, email, phone, address, passport_number, booking_id } = req.body;
        if (!name || !email || !phone || !address || !passport_number || !booking_id) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const existingPassenger = await Passenger.findOne({ where: { passport_number } });
        if (existingPassenger) {
            return res.status(400).json({ message: "Passenger already exists" });
        }
        const passenger = await Passenger.create({ name, email, phone, address, passport_number, booking_id });
        res.status(201).json(passenger);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


