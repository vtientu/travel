const db = require("../models");
const Article = db.Article;
const User = db.User;
const Directory = db.Directory;

// Lấy danh sách tất cả bài viết
exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.findAll({
      include: [
        {
          model: User,
          as: "author",
        },
        {
          model: Directory,
          as: "directory",
        },
      ],
    });
    res.status(200).json({
      message: "Retrieved all articles successfully!",
      data: articles,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving articles!",
      error: error.message,
    });
  }
};

//Lấy bài viết theo danh mục
exports.getArticlesByDirectory = async (req, res) => {
  try {
    const { directory_id } = req.params;

    const articles = await Article.findAll({
      where: {
        directory_id,
      },
      include: [
        {
          model: Directory,
          as: "directory",
        },
      ],
    });

    res.status(200).json({
      message: "Retrieved articles by directory successfully!",
      data: articles,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving articles by directory!",
      error: error.message,
    });
  }
};

//Thêm một bài viết mới
exports.createArticle = async (req, res) => {
  try {
    const { directory_id, user_id, alias, description } = req.body;

    const album_post = req.file ? req.file.path : null;

    // Tạo bài viết mới
    const data = {
      directory_id,
      user_id,
      alias,
      album_post,
      description,
    };

    const newArticle = await Article.create(data);

    res.status(200).json({
      message: "Created new article successfully!",
      data: newArticle,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating new article!",
      error: error.message,
    });
  }
};

//Cập nhật thông tin một bài viết
exports.updateArticle = async (req, res) => {
  try {
    const { article_id } = req.params;
    const { directory_id, user_id, alias, description } = req.body;

    const album_post = req.file ? req.file.path : null;

    const article = await Article.findByPk(article_id);

    if (!article) {
      return res.status(404).json({
        message: "Article not found!",
      });
    }

    if (directory_id !== undefined) article.directory_id = directory_id;
    if (user_id !== undefined) article.user_id = user_id;
    if (alias !== undefined) article.alias = alias;
    if (album_post !== null) article.album_post = album_post;
    if (description !== undefined) article.description = description;

    await article.save();

    res.status(200).json({
      message: "Updated article successfully!",
      data: article,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating article!",
      error: error.message,
    });
  }
};

//Xóa một bài viết
exports.deleteArticle = async (req, res) => {
  try {
    const { article_id } = req.params;

    const article = await Article.findByPk(article_id);

    if (!article) {
      return res.status(404).json({
        message: "Article not found!",
      });
    }

    await article.destroy();

    res.status(200).json({
      message: "Deleted article successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting article!",
      error: error.message,
    });
  }
};
