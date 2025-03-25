const express = require("express");
const router = express.Router();
const GuideTourController = require("../controllers/guideTour.controller");
const {
  authenticateUser,
  authenticateAdmin,
  authenticateStaff,
} = require("../middleware/authMiddleware");

router.get("/:id", GuideTourController.getGuideTours);
router.post("/create", authenticateUser, authenticateAdmin, GuideTourController.addGuideToTour);
router.delete(
  "/delete/:id",
  authenticateUser,
  authenticateAdmin,
  GuideTourController.removeGuideFromTour
);

module.exports = router;
