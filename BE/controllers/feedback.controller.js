const db = require("../models");
const Feedback = db.Feedback;
const User = db.User;
const Tour = db.Tour;

// Lấy tất cả Feedback
exports.getFeedbackByUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Lấy tất cả phản hồi của người dùng
    const feedbacks = await Feedback.findAll({
      where: { user_id: userId },
      include: [{ model: Tour, as: "tour" }],
    });

    if (feedbacks.length === 0) {
      return res
        .status(404)
        .json({ message: "No feedbacks found for this user" });
    }

    res.status(200).json({
      message: "Feedbacks fetched successfully",
      data: feedbacks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching feedbacks",
      error: error.message,
    });
  }
};

// Tạo mới Feedback
exports.createFeedback = async (req, res) => {
  try {
    const { user_id, tour_id, description_feedback, rating, feedback_date } =
      req.body;

    // Kiểm tra xem người dùng và tour có tồn tại không
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const tour = await Tour.findByPk(tour_id);
    if (!tour) {
      return res.status(404).json({ message: "Tour not found!" });
    }

    // Tạo phản hồi cho tour
    const newFeedback = await Feedback.create({
      user_id,
      tour_id,
      description_feedback,
      rating,
      feedback_date,
    });

    res.status(201).json({
      message: "Feedback created successfully!",
      data: newFeedback,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating feedback",
      error: error.message,
    });
  }
};

// Cập nhật Feedback
exports.updateFeedback = async (req, res) => {
  try {
    const feedbackId = req.params.id;
    const { description_feedback, rating, feedback_date } = req.body;

    const feedback = await Feedback.findByPk(feedbackId);
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found!" });
    }

    // Cập nhật các trường thông tin trong phản hồi
    if (description_feedback != undefined)
      feedback.description_feedback =
        description_feedback || feedback.description_feedback;
    if (rating != undefined) feedback.rating = rating || feedback.rating;
    if (feedback_date != undefined)
      feedback.feedback_date = feedback_date || feedback.feedback_date;

    await feedback.save();

    res.status(200).json({
      message: "Feedback updated successfully!",
      data: feedback,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating feedback",
      error: error.message,
    });
  }
};

// Xóa Feedback
exports.deleteFeedback = async (req, res) => {
  try {
    const feedbackId = req.params.id;

    const feedback = await Feedback.findByPk(feedbackId);
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found!" });
    }

    await feedback.destroy();

    res.status(200).json({
      message: "Feedback deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting feedback",
      error: error.message,
    });
  }
};
