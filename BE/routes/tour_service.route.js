const express = require("express");
const router = express.Router();
const tourServiceController = require("../controllers/tour_service.controller");

// Route để tạo tour service mới
router.post("/create", tourServiceController.createTourService);

module.exports = router; 