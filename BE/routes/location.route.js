const express = require("express");
const router = express.Router();
const locationController = require("../controllers/location.controller");

router.post("/create", locationController.createLocation);

module.exports = router;
