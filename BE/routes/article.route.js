const express = require("express");
const router = express.Router();
const ArticleController = require("../controllers/article.controller");
const { uploadAlbumPost, uploadAttachedFile } = require("../utils/cloudinary");
const {
  authenticateUser,
  authenticateAdmin,
  authenticateStaff,
  checkRoles,
} = require("../middleware/authMiddleware");

router.get("/", ArticleController.getAllArticles);
router.get("/:directory_id", ArticleController.getArticlesByDirectory);
router.post(
  "/create",
  checkRoles(["admin", "staff"]),
  uploadAlbumPost.single("album_post"),
  ArticleController.createArticle
);
router.put(
  "/update/:article_id",
  authenticateAdmin,
  uploadAlbumPost.single("album_post"),
  ArticleController.updateArticle
);
router.delete(
  "/delete/:article_id",
  authenticateAdmin,
  ArticleController.deleteArticle
);

module.exports = router;
