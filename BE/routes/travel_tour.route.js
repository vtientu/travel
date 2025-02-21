const express = require("express");
const router = express.Router();
const travelTourController = require("../controllers/travel_tour.controller");

// router.get("/", travelTourController.getAllTours);
router.post("/create", travelTourController.createTravelTour);
// router.post("/insert-sample", tourController.insertSampleData);

module.exports = router;
