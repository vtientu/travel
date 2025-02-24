const db = require("../models");
const PostExperience = db.PostExperience;
const Customer = db.Customer;

//Lấy tất cả bài viết trải nghiệm
exports.getAllPostExperiences = async (req, res) => {
  try {
    const postExperiences = await PostExperience.findAll({
      include: [{ model: Customer, as: "customer" }],
    });

    res.status(200).json({
      message: "Get all post experiences successfully!",
      data: postExperiences,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching post experiences",
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
      return res.status(404).json({ message: "Post experience not found!" });
    }

    res.status(200).json({
      message: "Post experience fetched successfully!",
      data: postExperience,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching post experience",
      error: error.message,
    });
  }
};

// Tạo bài viết trải nghiệm mới
exports.createPostExperience = async (req, res) => {
  try {
    const { customer_id, title_post, description_post, post_date } = req.body;

    // Kiểm tra xem customer có tồn tại không
    const customer = await Customer.findByPk(customer_id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found!" });
    }

    // Tạo mới bài viết trải nghiệm
    const newPostExperience = await PostExperience.create({
      customer_id,
      title_post,
      description_post,
      post_date,
    });

    res.status(201).json({
      message: "Post experience created successfully!",
      data: newPostExperience,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating post experience",
      error: error.message,
    });
  }
};

// Cập nhật bài viết trải nghiệm
exports.updatePostExperience = async (req, res) => {
  try {
    const postId = req.params.id;
    const { title_post, description_post, post_date } = req.body;

    const postExperience = await PostExperience.findByPk(postId);
    if (!postExperience) {
      return res.status(404).json({ message: "Post experience not found!" });
    }

    // Cập nhật bài viết trải nghiệm
    if (title_post != undefined)
      postExperience.title_post = title_post || postExperience.title_post;
    if (description_post != undefined)
      postExperience.description_post =
        description_post || postExperience.description_post;
    if (post_date != undefined)
      postExperience.post_date = post_date || postExperience.post_date;

    await postExperience.save();

    res.status(200).json({
      message: "Post experience updated successfully!",
      data: postExperience,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating post experience",
      error: error.message,
    });
  }
};

//Xóa bài viết trải nghiệm
exports.deletePostExperience = async (req, res) => {
  try {
    const postId = req.params.id;

    const postExperience = await PostExperience.findByPk(postId);
    if (!postExperience) {
      return res.status(404).json({ message: "Post experience not found!" });
    }

    await postExperience.destroy();

    res.status(200).json({
      message: "Post experience deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting post experience",
      error: error.message,
    });
  }
};
