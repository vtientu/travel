const db = require("../models");
const HotelBooking = db.HotelBooking;
const Hotel = db.Hotel;
const Booking = db.Booking;

//Lấy thông tin các khách sạn đã được đặt cho một booking
exports.getHotelBookingsByBookingId = async (req, res) => {
  try {
    const bookingId = req.params.booking_id;

    const hotelBookings = await HotelBooking.findAll({
      where: { booking_id: bookingId },
      include: [{ model: Hotel }],
    });

    if (hotelBookings.length === 0) {
      return res.status(404).json({ message: "No hotel bookings found!" });
    }

    res.status(200).json({
      message: "Hotel bookings fetched successfully",
      data: hotelBookings,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching hotel bookings",
      error: error.message,
    });
  }
};

//Đặt phòng Hotel
exports.addHotelToBooking = async (req, res) => {
  try {
    const { booking_id, hotel_id } = req.body;

    const newHotelBooking = await HotelBooking.create({
      booking_id,
      hotel_id,
    });

    res.status(201).json({
      message: "Hotel added to booking successfully!",
      data: newHotelBooking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding hotel to booking",
      error: error.message,
    });
  }
};

//Cancel Booking Hotel By id
exports.cancelBookingHotelById = async (req, res) => {
  try {
    const id = req.params.id;
    const hotelBooking = await HotelBooking.findByPk(id);

    if (!hotelBooking) {
      return res.status(404).json({
        message: "Hotel booking not found!",
      });
    }

    await hotelBooking.destroy();
    res.json({
      message: "Hotel booking cancelled successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error cancelling hotel booking!",
      error: error.message,
    });
  }
};
