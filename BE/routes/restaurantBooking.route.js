const express = require("express");
const router = express.Router();
const restaurantBookingController = require("../controllers/restaurantBooking.controller");

router.get(
  "/:booking_id",
  restaurantBookingController.getRestaurantBookingsByBookingId
);
router.post("/create", restaurantBookingController.addRestaurantToBooking);
router.delete(
  "/cancel/:id",
  restaurantBookingController.cancelRestaurantBooking
);

module.exports = router;
