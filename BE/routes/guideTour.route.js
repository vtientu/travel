const express = require("express");
const router = express.Router();
const GuideTourController = require("../controllers/guideTour.controller");

router.get("/:id", GuideTourController.getGuideTours);
router.post("/create", GuideTourController.addGuideToTour);
router.delete("/delete/:id", GuideTourController.removeGuideFromTour);

module.exports = router;
