const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const upload = require("../utils/upload");

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/create", upload.single("avatar"), userController.addNewUser);
router.put("/update/:id", upload.single("avatar"), userController.updateUser);
router.put("/change-password/:id", userController.changePassword);
router.put("/status/:id", userController.changeStatus);
router.get("/status-filter/:status", userController.filterByStatus);
router.post("/assign-role", userController.assignRole);

module.exports = router;
