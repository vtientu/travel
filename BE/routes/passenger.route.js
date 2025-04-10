const express = require("express");
const router = express.Router();
const passengerController = require("../controllers/passenger.controller");

router.post("/create", passengerController.createPassenger);
router.get("/:booking_id", passengerController.getPassengerByBookingId);
router.delete("/:id", passengerController.deletePassenger);
router.put("/:id", passengerController.updatePassenger);
module.exports = router;
