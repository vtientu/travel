const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/service.controller");

router.post("/create", serviceController.createService);

module.exports = router;
