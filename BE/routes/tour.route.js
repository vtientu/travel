const express = require("express");
const router = express.Router();
const tourController = require("../controllers/tour.controller");

router.get("/", tourController.getAllTours);
router.post("/", tourController.createTour);
router.post("/insert-sample", tourController.insertSampleData);

module.exports = router;
