const express = require("express");
const router = express.Router();
const vehicleBookingController = require("../controllers/vehicleBooking.controller");

router.get(
  "/:booking_id",
  vehicleBookingController.getVehicleBookingsByBookingId
);
router.post("/create", vehicleBookingController.addVehicleToBooking);
router.delete("/cancel/:id", vehicleBookingController.cancelVehicleBookingById);

module.exports = router;
