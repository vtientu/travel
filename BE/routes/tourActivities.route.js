const express = require("express");
const router = express.Router();
const tourActivitiesController = require("../controllers/tourActivities.controller");
const { uploadTourActivities } = require("../utils/cloudinary");
const {
  authenticateUser,
  authenticateAdmin,
  authenticateStaff,
} = require("../middleware/authMiddleware");

router.post(
  "/create",
  authenticateUser,
  authenticateAdmin,
  uploadTourActivities.single("image"),
  tourActivitiesController.createTourActivities
);

module.exports = router;
