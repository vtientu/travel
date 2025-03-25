const express = require("express");
const router = express.Router();
const DirectoryController = require("../controllers/directory.controller");
const {
  authenticateUser,
  authenticateAdmin,
  authenticateStaff,
} = require("../middleware/authMiddleware");

router.get("/", DirectoryController.getAllDirectories);
router.post("/create", authenticateAdmin, DirectoryController.createDirectory);
router.put(
  "/update/:id",
  authenticateAdmin,
  DirectoryController.updateDirectory
);
router.delete(
  "/delete/:id",
  authenticateAdmin,
  DirectoryController.deleteDirectory
);

module.exports = router;
