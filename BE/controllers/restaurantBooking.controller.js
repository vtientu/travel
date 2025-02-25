const db = require("../models");
const RestaurantBooking = db.RestaurantBooking;
const Restaurant = db.Restaurant;
const Booking = db.Booking;

//Lấy thông tin các nhà hàng đã được đặt cho một booking
exports.getRestaurantBookingsByBookingId = async (req, res) => {
  try {
    const bookingId = req.params.booking_id;

    const restaurantBookings = await RestaurantBooking.findAll({
      where: { booking_id: bookingId },
      include: [{ model: Restaurant }],
    });

    if (restaurantBookings.length === 0) {
      return res.status(404).json({ message: "No restaurant bookings found!" });
    }

    res.status(200).json({
      message: "Restaurant bookings fetched successfully",
      data: restaurantBookings,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching restaurant bookings",
      error: error.message,
    });
  }
};

//Thêm dịch vụ nhà hàng cho booking
exports.addRestaurantToBooking = async (req, res) => {
  try {
    const { booking_id, restaurant_id } = req.body;

    const newRestaurantBooking = await RestaurantBooking.create({
      booking_id,
      restaurant_id,
    });

    res.status(201).json({
      message: "Restaurant added to booking successfully!",
      data: newRestaurantBooking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding restaurant to booking",
      error: error.message,
    });
  }
};

//Hủy đặt bàn Restaurant
exports.cancelRestaurantBooking = async (req, res) => {
  try {
    const id = req.params.id;
    const restaurantBooking = await RestaurantBooking.findByPk(id);

    if (!restaurantBooking) {
      return res.status(404).json({
        message: "Restaurant booking not found!",
      });
    }

    await restaurantBooking.destroy();

    res.json({
      message: "Restaurant booking cancelled successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error cancelling restaurant booking!",
      error: error.message,
    });
  }
};
