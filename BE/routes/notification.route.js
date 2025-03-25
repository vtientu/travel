const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notification.controller");
const {
  authenticateUser,
  authenticateAdmin,
  authenticateStaff,
} = require("../middleware/authMiddleware");

router.get(
  "/",
  authenticateUser,
  notificationController.getNotificationsByUser
);
router.post(
  "/create",
  authenticateAdmin,
  authenticateStaff,
  notificationController.createNotificationForBooking
);
router.delete(
  "/delete/:id",
  authenticateUser,
  authenticateAdmin,
  notificationController.deleteNotification
);

module.exports = router;
