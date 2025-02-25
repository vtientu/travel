const db = require("../models");
const Booking = db.Booking;
const Restaurant = db.Restaurant;
const RestaurantBooking = db.RestaurantBooking;
const Hotel = db.Hotel;
const HotelBooking = db.HotelBooking;
const Vehicle = db.Vehicle;
const VehicleBooking = db.VehicleBooking;
const TravelTour = db.TravelTour;
const User = db.User;

//Lấy danh sách tất cả booking
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: [
        { model: User, attributes: ["id", "username", "avatar"] },
        {
          model: TravelTour,
          attributes: ["id", "tour_id", "start_time", "end_time", "price_tour"],
        },
        {
          model: RestaurantBooking,
          include: [
            {
              model: Restaurant,
              attributes: [
                "id",
                "name_restaurant",
                "address_restaurant",
                "phone_number",
              ],
            },
          ],
        },
        {
          model: HotelBooking,
          include: [
            {
              model: Hotel,
              attributes: ["id", "name_hotel", "address_hotel", "phone_number"],
            },
          ],
        },
        {
          model: VehicleBooking,
          include: [
            {
              model: Vehicle,
              attributes: ["id", "name_vehicle", "plate_number"],
            },
          ],
        },
      ],
    });

    res.status(200).json({
      message: "All bookings retrieved successfully",
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching bookings",
      error: error.message,
    });
  }
};

//Lấy chi tiết một booking theo ID
exports.getBookingById = async (req, res) => {
  try {
    const bookingId = req.params.id;

    const booking = await Booking.findByPk(bookingId, {
      include: [
        { model: User, attributes: ["id", "username", "avatar"] },
        {
          model: TravelTour,
          attributes: ["id", "tour_id", "start_time", "end_time", "price_tour"],
        },
        {
          model: RestaurantBooking,
          include: [
            {
              model: Restaurant,
              attributes: [
                "id",
                "name_restaurant",
                "address_restaurant",
                "phone_number",
              ],
            },
          ],
        },
        {
          model: HotelBooking,
          include: [
            {
              model: Hotel,
              attributes: ["id", "name_hotel", "address_hotel", "phone_number"],
            },
          ],
        },
        {
          model: VehicleBooking,
          include: [
            {
              model: Vehicle,
              attributes: ["id", "name_vehicle", "plate_number"],
            },
          ],
        },
      ],
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found!" });
    }

    res.status(200).json({
      message: "Booking retrieved successfully",
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching booking",
      error: error.message,
    });
  }
};

//Tạo mới một booking
exports.createBooking = async (req, res) => {
  try {
    const {
      user_id,
      travel_tour_id,
      number_adult,
      number_children,
      total_cost,
    } = req.body;

    const newBooking = await Booking.create({
      user_id,
      travel_tour_id,
      number_adult,
      number_children,
      total_cost,
    });

    res.status(201).json({
      message: "Booking created successfully!",
      data: newBooking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating booking",
      error: error.message,
    });
  }
};

// Cập nhật thông tin booking
exports.updateBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const { number_adult, number_children, total_cost, status } = req.body;

    const booking = await Booking.findByPk(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found!" });
    }

    if (number_adult != undefined)
      booking.number_adult = number_adult || booking.number_adult;
    if (number_children != undefined)
      booking.number_children = number_children || booking.number_children;
    if (total_cost != undefined)
      booking.total_cost = total_cost || booking.total_cost;
    if (status != undefined) booking.status = status || booking.status;

    await booking.save();

    res.status(200).json({
      message: "Booking updated successfully!",
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating booking",
      error: error.message,
    });
  }
};

// Cancel booking
exports.deleteBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;

    const booking = await Booking.findByPk(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found!" });
    }

    await booking.destroy();

    res.status(200).json({
      message: "Booking canceled successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error canceling booking",
      error: error.message,
    });
  }
};
