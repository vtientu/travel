const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/service.controller");

router.get("/", serviceController.getAllServices);
router.get("/:id", serviceController.getServiceById);
router.post("/create", serviceController.createService);
router.delete("/delete/:id", serviceController.deleteService);
router.put("/update/:id", serviceController.updateService);

module.exports = router;
