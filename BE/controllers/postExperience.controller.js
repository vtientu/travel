const db = require("../models");
const PostExperience = db.PostExperience;
const Customer = db.Customer;

// Lấy tất cả bài viết trải nghiệm
exports.getAllPostExperiences = async (req, res) => {
  try {
    const postExperiences = await PostExperience.findAll({
      include: [{ model: Customer, as: "customer" }],
    });

    res.status(200).json({
      message: "Lấy tất cả bài viết trải nghiệm thành công!",
      data: postExperiences,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy bài viết trải nghiệm",
      error: error.message,
    });
  }
};

// Lấy bài viết trải nghiệm theo ID
exports.getPostExperienceById = async (req, res) => {
  try {
    const postId = req.params.id;
    const postExperience = await PostExperience.findByPk(postId, {
      include: [{ model: Customer, as: "customer" }],
    });

    if (!postExperience) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy bài viết trải nghiệm!" });
    }

    res.status(200).json({
      message: "Lấy bài viết trải nghiệm thành công!",
      data: postExperience,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy bài viết trải nghiệm",
      error: error.message,
    });
  }
};

// Tạo bài viết trải nghiệm mới
exports.createPostExperience = async (req, res) => {
  try {
    const { customer_id, title_post, description_post, post_date } = req.body;
    const postEx_album =
      req.files && req.files.length > 0
        ? JSON.stringify(req.files.map((file) => file.path))
        : null;
    // Kiểm tra xem customer có tồn tại không
    const customer = await Customer.findByPk(customer_id);
    if (!customer) {
      return res.status(404).json({ message: "Không tìm thấy khách hàng!" });
    }

    // Tạo mới bài viết trải nghiệm
    const newPostExperience = await PostExperience.create({
      customer_id,
      title_post,
      description_post,
      post_date,
      postEx_album,
    });

    res.status(201).json({
      message: "Tạo bài viết trải nghiệm thành công!",
      data: newPostExperience,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi tạo bài viết trải nghiệm",
      error: error.message,
    });
  }
};

// Cập nhật bài viết trải nghiệm
exports.updatePostExperience = async (req, res) => {
  try {
    const postId = req.params.id;
    const { title_post, description_post, post_date } = req.body;
    const postEx_album =
      req.files && req.files.length > 0
        ? JSON.stringify(req.files.map((file) => file.path))
        : null;

    const postExperience = await PostExperience.findByPk(postId);
    if (!postExperience) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy bài viết trải nghiệm!" });
    }

    // Cập nhật bài viết trải nghiệm
    if (title_post != undefined)
      postExperience.title_post = title_post || postExperience.title_post;
    if (description_post != undefined)
      postExperience.description_post =
        description_post || postExperience.description_post;
    if (post_date != undefined)
      postExperience.post_date = post_date || postExperience.post_date;
    if (postEx_album != undefined)
      postExperience.postEx_album = postEx_album || postExperience.postEx_album;

    await postExperience.save();

    res.status(200).json({
      message: "Cập nhật bài viết trải nghiệm thành công!",
      data: postExperience,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi cập nhật bài viết trải nghiệm",
      error: error.message,
    });
  }
};

// Xóa bài viết trải nghiệm
exports.deletePostExperience = async (req, res) => {
  try {
    const postId = req.params.id;

    const postExperience = await PostExperience.findByPk(postId);
    if (!postExperience) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy bài viết trải nghiệm!" });
    }

    await postExperience.destroy();

    res.status(200).json({
      message: "Xóa bài viết trải nghiệm thành công!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi xóa bài viết trải nghiệm",
      error: error.message,
    });
  }
};
