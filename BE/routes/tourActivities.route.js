const express = require("express");
const router = express.Router();
const tourActivitiesController = require("../controllers/tourActivities.controller");
const { uploadTourActivities } = require("../utils/cloudinary");

router.post(
  "/create",
  uploadTourActivities.single("image"),
  tourActivitiesController.createTourActivities
);

module.exports = router;
