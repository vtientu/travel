const express = require("express");
const router = express.Router();
const travelGuideController = require("../controllers/travelGuide.controller");

router.get("/", travelGuideController.getAllTravelGuides);
router.get("/:user_id", travelGuideController.getTravelGuidesByUser);
router.post("/create", travelGuideController.createTravelGuide);
router.put("/update/:id", travelGuideController.updateTravelGuide);
router.delete("/delete/:id", travelGuideController.deleteTravelGuide);

module.exports = router;
