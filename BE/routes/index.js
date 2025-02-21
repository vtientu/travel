const express = require("express");
const router = express.Router();
const TourRouter = require("./tour.route");
const TravelTourRouter = require("./travel_tour.route");
const LocationRouter = require("./location.route");
const ServiceRouter = require("./service.route");
const TourServiceRouter = require("./tour_service.route");

router.use("/tour", TourRouter);
router.use("/location", LocationRouter);
router.use("/service", ServiceRouter);
router.use("/tour-service", TourServiceRouter);
router.use("/travel-tour", TravelTourRouter);
module.exports = router;
