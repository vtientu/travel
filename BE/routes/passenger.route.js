const express = require("express");
const router = express.Router();
const passengerController = require("../controllers/passenger.controller");

router.post("/create", passengerController.createPassenger);
router.get("/:booking_id", passengerController.getPassengerByBookingId);
module.exports = router;
