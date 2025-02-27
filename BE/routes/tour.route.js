const express = require("express");
const router = express.Router();
const tourController = require("../controllers/tour.controller");
const { uploadTourImage } = require("../utils/upload");

router.get("/", tourController.getAllTours);
router.get("/:id", tourController.getTourById);
router.post(
  "/create",
  uploadTourImage.single("image"),
  tourController.createTour
);
router.delete("/delete/:id", tourController.deleteTourById);
router.put(
  "/update/:id",
  uploadTourImage.single("image"),
  tourController.updateTourById
);
router.get(
  "/get-by-location-id/:locationId",
  tourController.getTourByLocationId
);
// router.post("/insert-sample", tourController.insertSampleData);

module.exports = router;
