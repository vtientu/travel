const express = require("express");
const router = express.Router();
const BookingController = require("../controllers/booking.controller");
const {
    authenticateUser,
    authenticateAdmin,
    authenticateStaff,
} = require("../middleware/authMiddleware");

router.get("/", BookingController.getAllBookings);

router.get(
    "/search",
    BookingController.searchBooking
);
router.get(
    "/:id",
    authenticateUser,
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
router.put("/update/:id", authenticateUser, authenticateStaff, BookingController.updateBooking);
router.delete(
    "/cancel/:id",
    authenticateUser,
    authenticateAdmin,
    BookingController.deleteBooking
);
router.get(
    "/latest",
    authenticateUser,
    BookingController.getLatestBooking
);
router.get(
    "/user/:id",
    // authenticateUser,
    BookingController.getBookingByUserId
);


module.exports = router;
