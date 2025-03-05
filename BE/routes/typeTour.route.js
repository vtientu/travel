const express = require("express");
const router = express.Router();
const typeTourController = require("../controllers/typeTour.controller");

router.get("/", typeTourController.getAllTypeTours);


module.exports = router;
