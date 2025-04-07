const express = require("express");
const router = express.Router();
const travelGuideController = require("../controllers/travelGuide.controller");
const {
  authenticateUser,
  authenticateAdmin,
  authenticateStaff,
} = require("../middleware/authMiddleware");

router.get("/", travelGuideController.getAllTravelGuides);
router.get(
  "/feedback/:travelGuideId",
  authenticateStaff,
  authenticateAdmin,
  travelGuideController.getFeedbackByTravelGuide
);
router.get(
  "/:user_id",
  authenticateUser,
  travelGuideController.getTravelGuidesByUser
);
router.post(
  "/create",
  authenticateUser,
  authenticateAdmin,
  travelGuideController.createTravelGuide
);
router.put(
  "/update/:id",
  authenticateUser,
  authenticateAdmin,
  travelGuideController.updateTravelGuide
);
router.delete(
  "/delete/:id",
  authenticateUser,
  authenticateAdmin,
  travelGuideController.deleteTravelGuide
);
router.get(
  "/tour/guide/:travelGuideId",
  // authenticateUser,
  // authenticateStaff,
  // authenticateAdmin,
  travelGuideController.getToursByTravelGuideLocation
);

module.exports = router;
