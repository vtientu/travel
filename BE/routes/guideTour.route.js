const express = require("express");
const router = express.Router();
const GuideTourController = require("../controllers/guideTour.controller");
const {
  authenticateUser,
  authenticateAdmin,
  authenticateStaff,
} = require("../middleware/authMiddleware");

router.get("/:id", GuideTourController.getGuideTours);
router.post("/create", 
  // authenticateUser, 
  // authenticateAdmin, 
  GuideTourController.addGuideToTour);
router.delete(
  "/delete/:id",
  authenticateUser,
  authenticateAdmin,
  GuideTourController.removeGuideFromTour
);
router.put("/approve/:id", 
  // authenticateUser, 
  // authenticateAdmin, 
  GuideTourController.approveGuideTour);
router.put("/reject/:id", 
  // authenticateUser, 
  // authenticateAdmin, 
  GuideTourController.rejectGuideTour);
router.get("/user/:id", 
  // authenticateUser, 
  // authenticateAdmin, 
  GuideTourController.getGuideTourByUserId);
module.exports = router;
