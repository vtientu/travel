const express = require("express");
const router = express.Router();
const hotelBookingController = require("../controllers/hotelBooking.controller");

router.get("/:booking_id", hotelBookingController.getHotelBookingsByBookingId);
router.post("/create", hotelBookingController.addHotelToBooking);
router.delete("/cancel/:id", hotelBookingController.cancelBookingHotelById);

module.exports = router;
