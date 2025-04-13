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
  uploadAlbumPost.array("album_post", 10),
  ArticleController.createArticle
);
router.put(
  "/update/:article_id",
  authenticateAdmin,
  uploadAlbumPost.array("album_post", 10),
  ArticleController.updateArticle
);
router.delete(
  "/delete/:article_id",
  authenticateAdmin,
  ArticleController.deleteArticle
);
//Tăng lượt xem bài viết
router.post(
  "/increment-views/:id",
  authenticateUser,
  ArticleController.incrementViews
);

module.exports = router;
