const express = require("express");
const router = express.Router();
const postExperienceController = require("../controllers/postExperience.controller");
const { uploadPostExperience } = require("../utils/cloudinary");
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
  uploadPostExperience.array("postEx_album", 10),
  postExperienceController.createPostExperience
);
router.put(
  "/update/:id",
  authenticateUser,
  uploadPostExperience.array("postEx_album", 10),
  postExperienceController.updatePostExperience
);
router.delete(
  "/delete/:id",
  authenticateUser,
  authenticateAdmin,
  postExperienceController.deletePostExperience
);

module.exports = router;
