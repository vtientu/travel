const express = require("express");
const router = express.Router();
const tourServiceController = require("../controllers/tour_service.controller");

router.post("/create", tourServiceController.createTourService);

module.exports = router;
