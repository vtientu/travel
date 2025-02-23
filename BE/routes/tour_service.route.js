const express = require("express");
const router = express.Router();
const tourServiceController = require("../controllers/tour_service.controller");

router.get("/", tourServiceController.getAllTourServices);
router.get("/:id", tourServiceController.getTourServiceById);
router.post("/create", tourServiceController.createTourService);
router.delete("/delete/:id", tourServiceController.deleteTourService);
router.put("/update/:id", tourServiceController.updateTourService);

module.exports = router;
