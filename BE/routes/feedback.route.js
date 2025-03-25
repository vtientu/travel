const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedback.controller");
const {
  authenticateUser,
  authenticateAdmin,
  authenticateStaff,
} = require("../middleware/authMiddleware");

router.get("/:userId", authenticateUser, feedbackController.getFeedbackByUser);
router.post("/create", authenticateUser, feedbackController.createFeedback);
router.put("/update/:id", authenticateAdmin, feedbackController.updateFeedback);
router.delete(
  "/delete/:id",
  authenticateAdmin,
  feedbackController.deleteFeedback
);

module.exports = router;
