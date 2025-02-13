const express = require("express");
const router = express.Router();
const TourRouter = require("./tour.route");

router.use("/tour", TourRouter);
module.exports = router;
