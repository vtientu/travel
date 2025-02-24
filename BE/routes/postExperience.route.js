const express = require("express");
const router = express.Router();
const postExperienceController = require("../controllers/postExperience.controller");

router.get("/", postExperienceController.getAllPostExperiences);
router.get("/:id", postExperienceController.getPostExperienceById);
router.post("/create", postExperienceController.createPostExperience);
router.put("/update/:id", postExperienceController.updatePostExperience);
router.delete("/delete/:id", postExperienceController.deletePostExperience);

module.exports = router;
