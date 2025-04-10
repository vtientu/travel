const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedback.controller");
const {
  authenticateUser,
  authenticateAdmin,
  authenticateStaff,
} = require("../middleware/authMiddleware");

router.get(
  "/:userId",
  // authenticateUser,
  feedbackController.getFeedbackByUser
);
router.post(
  "/create/tour",
  // authenticateUser,
  feedbackController.createFeedbackForTour
);
router.post(
  "/create/travel-guide",
  // authenticateUser,
  feedbackController.createFeedbackForTravelGuide
);
router.put(
  "/update/:id",
  // authenticateUser,
  // authenticateAdmin,
  feedbackController.updateFeedback
);
router.delete(
  "/delete/:id",
  // authenticateUser,
  // authenticateAdmin,
  feedbackController.deleteFeedback
);

module.exports = router;
