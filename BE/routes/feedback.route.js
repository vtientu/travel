const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedback.controller");

router.get("/:userId", feedbackController.getFeedbackByUser);
router.post("/create", feedbackController.createFeedback);
router.put("/update/:id", feedbackController.updateFeedback);
router.delete("/delete/:id", feedbackController.deleteFeedback);

module.exports = router;
