const express = require("express");
const router = express.Router();
const BookingController = require("../controllers/booking.controller");
const {
  authenticateUser,
  authenticateAdmin,
  authenticateStaff,
} = require("../middleware/authMiddleware");

router.get("/", authenticateAdmin, BookingController.getAllBookings);
router.get(
  "/:id",
  authenticateUser,
  authenticateAdmin,
  BookingController.getBookingById
);
// router.post(
//   "/create",
//   authenticateUser,
//   authenticateAdmin,
//   BookingController.createBooking
// );
router.post(
  "/create",
  // authenticateUser,
  BookingController.createBooking
);
router.put("/update/:id", authenticateStaff, BookingController.updateBooking);
router.delete(
  "/cancel/:id",
  authenticateUser,
  authenticateAdmin,
  BookingController.deleteBooking
);

module.exports = router;
