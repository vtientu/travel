const db = require("../models");
const Passenger = db.Passenger;
const Booking = db.Booking;

// Tạo hành khách mới
exports.createPassenger = async (req, res) => {
  try {
    const {
      name,
      birth_date,
      gender,
      phone_number,
      passport_number,
      booking_id,
    } = req.body;
    if (
      !name ||
      !birth_date ||
      !gender ||
      !phone_number ||
      !passport_number ||
      !booking_id
    ) {
      return res.status(400).json({ message: "Thiếu thông tin bắt buộc" });
    }
    const existingBooking = await db.Booking.findByPk(booking_id);
    if (!existingBooking) {
      return res.status(404).json({ message: "Không tìm thấy đặt chỗ" });
    }
    // const existingPassenger = await Passenger.findOne({ where: { passport_number } });
    // if (existingPassenger) {
    //     return res.status(400).json({ message: "Hành khách đã tồn tại" });
    // }
    const passenger = await Passenger.create({
      name,
      birth_date,
      gender,
      phone_number,
      passport_number,
      booking_id,
    });
    res.status(201).json(passenger);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getPassengerByBookingId = async (req, res) => {
  try {
    const { booking_id } = req.params;
    if (!booking_id) {
      return res.status(400).json({ message: "Thiếu booking_id" });
    }
    const existingBooking = await Booking.findByPk(booking_id);
    if (!existingBooking) {
      return res.status(404).json({ message: "Không tìm thấy đặt chỗ" });
    }
    const passenger = await Passenger.findAll({ where: { booking_id } });
    if (!passenger) {
      return res.status(404).json({ message: "Không tìm thấy hành khách" });
    }
    res.status(200).json(passenger);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.deletePassenger = async (req, res) => {
  try {
    const { id } = req.params;
    const passenger = await Passenger.findByPk(id);
    if (!passenger) {
      return res.status(404).json({ message: "Không tìm thấy hành khách" });
    }
    await passenger.destroy();
    res.status(200).json({ message: "Hành khách đã được xóa" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
exports.updatePassenger = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, birth_date, gender, phone_number, passport_number } = req.body;
    const passenger = await Passenger.findByPk(id);
    if (!passenger) {
      return res.status(404).json({ message: "Không tìm thấy hành khách" });
    }
    passenger.name = name;
    passenger.birth_date = birth_date;
    passenger.gender = gender;
    passenger.phone_number = phone_number;
    passenger.passport_number = passport_number;
    await passenger.save();
    res.status(200).json(passenger);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

