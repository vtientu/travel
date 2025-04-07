const express = require("express");
const router = express.Router();
const tourActivitiesController = require("../controllers/tourActivities.controller");
const {uploadTourActivities} = require("../utils/cloudinary");
const {
    authenticateUser,
    authenticateAdmin,
    authenticateStaff,
} = require("../middleware/authMiddleware");

router.post(
    "/create",
    // authenticateUser,
    // authenticateAdmin,
    uploadTourActivities.single("image"),
    tourActivitiesController.createTourActivities
);
router.put(
    "/update/:id",
    // authenticateUser,
    // authenticateAdmin,
    uploadTourActivities.single("image"),
    tourActivitiesController.updateTourActivities
);  
router.delete(
    "/delete/:id",
    // authenticateUser,
    // authenticateAdmin,
    tourActivitiesController.deleteTourActivities
);


module.exports = router;
