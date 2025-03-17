const express = require("express");
const router = express.Router();
const travelTourController = require("../controllers/travel_tour.controller");
const {
  authenticateUser,
  authenticateAdmin,
  authenticateStaff,
} = require("../middleware/authMiddleware");

router.get("/", travelTourController.getAllTravelTours);
router.get("/:id", authenticateUser, travelTourController.getTravelTourById);
router.post(
  "/create",
  authenticateAdmin,
  travelTourController.createTravelTour
);
router.put(
  "/update/:id",
  authenticateAdmin,
  travelTourController.updateTravelTour
);
router.delete(
  "/delete/:id",
  authenticateAdmin,
  travelTourController.deleteTravelTour
);
router.get(
  "/tour/:id",
  authenticateAdmin,
  authenticateUser,
  travelTourController.getTravelTourByTourId
);
// router.post("/insert-sample", tourController.insertSampleData);

module.exports = router;
