const db = require("../models");
const VehicleBooking = db.VehicleBooking;
const Vehicle = db.Vehicle;
const Booking = db.Booking;

//Lấy thông tin các phương tiện đã được đặt cho một booking
exports.getVehicleBookingsByBookingId = async (req, res) => {
  try {
    const bookingId = req.params.booking_id;

    const vehicleBookings = await VehicleBooking.findAll({
      where: { booking_id: bookingId },
      include: [{ model: Vehicle }],
    });

    if (vehicleBookings.length === 0) {
      return res.status(404).json({ message: "No vehicle bookings found!" });
    }

    res.status(200).json({
      message: "Vehicle bookings fetched successfully",
      data: vehicleBookings,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching vehicle bookings",
      error: error.message,
    });
  }
};

// Booking Vehicle
exports.addVehicleToBooking = async (req, res) => {
  try {
    const { booking_id, vehicle_id } = req.body;

    const newVehicleBooking = await VehicleBooking.create({
      booking_id,
      vehicle_id,
    });

    res.status(201).json({
      message: "Vehicle added to booking successfully!",
      data: newVehicleBooking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding vehicle to booking",
      error: error.message,
    });
  }
};

//Cancel Vehicle Booking By Id
exports.cancelVehicleBookingById = async (req, res) => {
  try {
    const id = req.params.id;

    const vehicleBooking = await VehicleBooking.findByPk(id);

    if (!vehicleBooking) {
      return res.status(404).json({ message: "Vehicle booking not found!" });
    }

    await vehicleBooking.destroy();

    res
      .status(200)
      .json({ message: "Vehicle booking cancelled successfully!" });
  } catch (error) {
    res.status(500).json({
      message: "Error cancelling vehicle booking",
      error: error.message,
    });
  }
};
