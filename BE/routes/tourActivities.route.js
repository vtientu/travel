const express = require("express");
const router = express.Router();
const tourActivitiesController = require("../controllers/tourActivities.controller");

router.post("/create", tourActivitiesController.createTourActivities);

module.exports = router; 