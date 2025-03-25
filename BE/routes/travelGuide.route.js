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

module.exports = router;
