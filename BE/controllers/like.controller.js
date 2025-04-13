const db = require("../models");
const Like = db.Like;
const Feedback = db.Feedback;
const PostExperience = db.PostExperience;
const Article = db.Article;

//Like/Unlike
exports.toggleLike = async (req, res) => {
  try {
    const { user_id, target_id, target_type } = req.body;

    // Kiểm tra target_type có hợp lệ không
    const validTargetTypes = ["feedback", "postExperience", "article"];
    if (!validTargetTypes.includes(target_type)) {
      return res.status(400).json({ message: "target_type không hợp lệ" });
    }

    // Kiểm tra target_id có tồn tại trong Feedback, ExperiencePost hoặc Article
    const isValidTarget = await Promise.any([
      Feedback.findByPk(target_id),
      PostExperience.findByPk(target_id),
      Article.findByPk(target_id),
    ]);

    if (!isValidTarget) {
      return res.status(400).json({ message: "target_id không hợp lệ" });
    }

    // Kiểm tra xem đã like chưa
    const existingLike = await Like.findOne({
      where: { user_id, target_id, target_type },
    });

    if (existingLike) {
      // Nếu đã like, thì unlike (xóa like)
      await existingLike.destroy();
      return res.status(200).json({ message: "Bỏ thích thành công" });
    } else {
      // Nếu chưa like, thì thêm like
      await Like.create({ user_id, target_id, target_type });
      return res.status(201).json({ message: "Thích thành công" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Lỗi máy chủ nội bộ" });
  }
};

//Kiểm tra xem đã like hay chưa
exports.isLiked = async (req, res) => {
  try {
    const { user_id, target_id, target_type } = req.query;

    // Kiểm tra target_type có hợp lệ không
    const validTargetTypes = ["feedback", "postExperience", "article"];
    if (!validTargetTypes.includes(target_type)) {
      return res.status(400).json({ message: "target_type không hợp lệ" });
    }

    // Kiểm tra target_id có tồn tại trong Feedback, ExperiencePost hoặc Article
    const isValidTarget = await Promise.any([
      Feedback.findByPk(target_id),
      PostExperience.findByPk(target_id),
      Article.findByPk(target_id),
    ]);

    if (!isValidTarget) {
      return res.status(400).json({ message: "target_id không hợp lệ" });
    }
    const isLiked = await Like.findOne({
      where: { user_id, target_id, target_type },
    });

    return res.status(200).json({ isLiked: !!isLiked });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Lỗi máy chủ nội bộ" });
  }
};

//Đếm số lượng like
exports.countLikes = async (req, res) => {
  try {
    const { target_id, target_type } = req.query;

    // Kiểm tra target_type có hợp lệ không
    const validTargetTypes = ["feedback", "postExperience", "article"];
    if (!validTargetTypes.includes(target_type)) {
      return res.status(400).json({ message: "target_type không hợp lệ" });
    }

    // Kiểm tra target_id có tồn tại trong Feedback, ExperiencePost hoặc Article
    const isValidTarget = await Promise.any([
      Feedback.findByPk(target_id),
      PostExperience.findByPk(target_id),
      Article.findByPk(target_id),
    ]);

    if (!isValidTarget) {
      return res.status(400).json({ message: "target_id không hợp lệ" });
    }
    const count = await Like.count({
      where: { target_id, target_type },
    });

    return res.status(200).json({ count });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Lỗi máy chủ nội bộ" });
  }
};
