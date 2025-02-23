const express = require("express");
const router = express.Router();
const tourController = require("../controllers/tour.controller");

router.get("/", tourController.getAllTours);
router.get("/:id", tourController.getTourById);
router.post("/create", tourController.createTour);
router.delete("/delete/:id", tourController.deleteTourById);
router.put("/update/:id", tourController.updateTourById);
// router.post("/insert-sample", tourController.insertSampleData);

module.exports = router;
