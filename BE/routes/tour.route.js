const express = require("express");
const router = express.Router();
const tourController = require("../controllers/tour.controller");
const { uploadTourImage } = require("../utils/upload");

router.get("/search", tourController.searchTour);
router.get("/get-by-location-id/:locationId", tourController.getTourByLocationId);
router.get("/:id/activities", tourController.getTourActivities);

router.get("/", tourController.getAllTours);
router.get("/:id", tourController.getTourById);
router.post("/create", uploadTourImage.single("image"), tourController.createTour);
router.put("/update/:id", uploadTourImage.single("image"), tourController.updateTourById);
router.delete("/delete/:id", tourController.deleteTourById);
module.exports = router;
