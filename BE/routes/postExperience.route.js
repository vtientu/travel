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
router.get(
  "/user/:user_id",
  postExperienceController.getPostExperienceByUserId
);
router.post(
  "/create",
  // authenticateUser,
  uploadPostExperience.array("postEx_album", 10),
  postExperienceController.createPostExperience
);
router.put(
  "/update/:id",
  // authenticateUser,
  uploadPostExperience.array("postEx_album", 10),
  postExperienceController.updatePostExperience
);
router.delete(
  "/delete/:id",
  authenticateUser,
  authenticateAdmin,
  postExperienceController.deletePostExperience
);
router.put(
  "/approve/:id",
  authenticateUser,
  authenticateAdmin,
  postExperienceController.approvePostExperience
);
router.put(
  "/reject/:id",
  authenticateUser,
  authenticateAdmin,
  postExperienceController.rejectPostExperience
);
//Tăng lượt xem bài viết
router.post(
  "/increment-views/:id",
  authenticateUser,
  postExperienceController.incrementViews
);

module.exports = router;
