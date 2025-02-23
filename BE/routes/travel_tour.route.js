const express = require("express");
const router = express.Router();
const travelTourController = require("../controllers/travel_tour.controller");

router.get("/", travelTourController.getAllTravelTours);
router.get("/:id", travelTourController.getTravelTourById);
router.post("/create", travelTourController.createTravelTour);
router.put("/update/:id", travelTourController.updateTravelTour);
router.delete("/delete/:id", travelTourController.deleteTravelTour);
// router.post("/insert-sample", tourController.insertSampleData);

module.exports = router;
