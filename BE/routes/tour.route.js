const express = require("express");
const router = express.Router();
const tourController = require("../controllers/tour.controller");
const { uploadTourImage } = require("../utils/cloudinary");
const {
  authenticateUser,
  authenticateAdmin,
  authenticateStaff,
} = require("../middleware/authMiddleware");

router.get("/search", tourController.searchTour);
router.get(
  "/get-by-location-id/:locationId",
  tourController.getTourByLocationId
);
router.get(
  "/:id/activities",
  tourController.getTourActivities
);

router.get(
  "/",
  tourController.getAllTours
);

router.get(
  "/:id",
  tourController.getTourById
);

router.post(
  "/create",
  authenticateUser,
  authenticateAdmin,
  uploadTourImage.single("image"),
  tourController.createTour
);

router.put(
  "/update/:id",
  uploadTourImage.single("image"),
  authenticateUser,
  authenticateAdmin,
  tourController.updateTourById
);

router.delete(
  "/delete/:id",
  authenticateUser,
  authenticateAdmin,
  tourController.deleteTourById
);

module.exports = router;
