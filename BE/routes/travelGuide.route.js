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
  authenticateAdmin,
  travelGuideController.createTravelGuide
);
router.put(
  "/update/:id",
  authenticateAdmin,
  travelGuideController.updateTravelGuide
);
router.delete(
  "/delete/:id",
  authenticateAdmin,
  travelGuideController.deleteTravelGuide
);

module.exports = router;
