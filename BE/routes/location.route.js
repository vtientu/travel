const express = require("express");
const router = express.Router();
const locationController = require("../controllers/location.controller");
const { uploadLocation } = require("../utils/cloudinary");

router.get("/", locationController.getAllLocations);
router.get("/:id", locationController.getLocationById);
router.post(
  "/create",
  uploadLocation.single("image"),
  locationController.createLocation
);
router.put(
  "/update/:id",
  uploadLocation.single("image"),
  locationController.updateLocation
);
router.delete("/delete/:id", locationController.deleteLocation);

module.exports = router;
