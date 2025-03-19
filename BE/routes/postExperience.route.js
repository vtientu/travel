const express = require("express");
const router = express.Router();
const postExperienceController = require("../controllers/postExperience.controller");
const {
  authenticateUser,
  authenticateAdmin,
  authenticateStaff,
} = require("../middleware/authMiddleware");

router.get("/", postExperienceController.getAllPostExperiences);
router.get("/:id", postExperienceController.getPostExperienceById);
router.post(
  "/create",
  authenticateUser,
  postExperienceController.createPostExperience
);
router.put(
  "/update/:id",
  authenticateUser,
  postExperienceController.updatePostExperience
);
router.delete(
  "/delete/:id",
  authenticateUser,
  authenticateAdmin,
  postExperienceController.deletePostExperience
);

module.exports = router;
