const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/service.controller");
const {
  authenticateUser,
  authenticateAdmin,
  authenticateStaff,
} = require("../middleware/authMiddleware");

router.get("/", serviceController.getAllServices);
router.get("/:id", authenticateUser, serviceController.getServiceById);
router.post("/create", authenticateAdmin, serviceController.createService);
router.delete(
  "/delete/:id",
  authenticateAdmin,
  serviceController.deleteService
);
router.put("/update/:id", authenticateAdmin, serviceController.updateService);

module.exports = router;
