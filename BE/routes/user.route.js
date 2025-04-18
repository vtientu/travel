const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { uploadAvatar } = require("../utils/cloudinary");
const {
  authenticateUser,
  authenticateAdmin,
  authenticateStaff,
} = require("../middleware/authMiddleware");

router.get("/", authenticateUser, authenticateAdmin, userController.getAllUsers);
router.get("/:id", authenticateUser, authenticateAdmin, userController.getUserById);
router.post(
  "/create",
  authenticateUser,
  authenticateAdmin,
  uploadAvatar.single("avatar"),
  userController.addNewUser
);
router.put(
  "/update/:id",
  authenticateUser,
  authenticateAdmin,
  uploadAvatar.single("avatar"),
  userController.updateUser
);
router.put(
  "/change-password/:id",
  authenticateUser,
  userController.changePassword
);
router.put("/status/:id", authenticateUser, authenticateAdmin, userController.changeStatus);
router.get(
  "/status-filter/:status",
  authenticateUser,
  authenticateAdmin,
  userController.filterByStatus
);
router.post("/assign-role", authenticateUser, authenticateAdmin, userController.assignRole);

module.exports = router;
