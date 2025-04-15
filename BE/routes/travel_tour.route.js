const express = require("express");
const router = express.Router();
const travelTourController = require("../controllers/travel_tour.controller");
const {
  authenticateUser,
  authenticateAdmin,
  authenticateStaff,
} = require("../middleware/authMiddleware");

router.get("/", travelTourController.getAllTravelTours);
router.get("/guide", travelTourController.getListTravelTourForGuide);
// router.get("/:id", authenticateUser, travelTourController.getTravelTourById);
router.get("/:id", travelTourController.getTravelTourById);
router.post(
  "/create",
  authenticateUser,
  authenticateAdmin,
  travelTourController.createTravelTour
);
router.put(
  "/update/:id",
  authenticateUser,
  authenticateAdmin,
  travelTourController.updateTravelTour
);
router.delete(
  "/delete/:id",
  authenticateUser,
  authenticateAdmin,
  travelTourController.deleteTravelTour
);
router.get(
  "/tour/:id",
  // authenticateAdmin,
  // authenticateUser,
  travelTourController.getTravelTourByTourId
);

router.post(
  "/close/:id",
  authenticateAdmin,
  travelTourController.closeTourWhenFull
);

module.exports = router;
