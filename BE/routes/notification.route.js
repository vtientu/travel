const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notification.controller");

router.get("/", notificationController.getNotificationsByUser);
router.post("/create", notificationController.createNotificationForBooking);
router.delete("/delete/:id", notificationController.deleteNotification);

module.exports = router;
