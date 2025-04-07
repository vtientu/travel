const db = require("../models");
const Feedback = db.Feedback;
const Tour = db.Tour;
const Customer = db.Customer;
const TravelGuide = db.TravelGuide;

// Lấy tất cả Feedback theo customer_id
exports.getFeedbackByCustomer = async (req, res) => {
  try {
    const customerId = req.params.customerId;

    // Tìm Customer dựa trên customer_id
    const customer = await Customer.findByPk(customerId);

    if (!customer) {
      return res.status(404).json({ message: "Khách hàng không tồn tại!" });
    }

    // Lấy tất cả feedback của customer dựa trên customer_id
    const feedbacks = await Feedback.findAll({
      where: { customer_id: customerId },
      include: [
        { model: Tour, as: "tour" },
        {
          model: Customer,
          as: "customer",
          attributes: ["first_name", "last_name"],
        },
        {
          model: TravelGuide,
          as: "travelGuide",
          attributes: ["first_name", "last_name"],
        },
      ],
    });

    if (feedbacks.length === 0) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy feedback nào cho khách hàng này" });
    }

    res.status(200).json({
      message: "Lấy feedback thành công",
      data: feedbacks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy feedback",
      error: error.message,
    });
  }
};

// Tạo feedback cho Tour
exports.createFeedbackForTour = async (req, res) => {
  try {
    const {
      customer_id,
      tour_id,
      description_feedback,
      rating,
      feedback_date,
    } = req.body;

    const customer = await Customer.findByPk(customer_id);
    if (!customer) {
      return res.status(404).json({ message: "Khách hàng không tồn tại!" });
    }

    const tour = await Tour.findByPk(tour_id);
    if (!tour) {
      return res.status(404).json({ message: "Tour không tồn tại!" });
    }

    // Kiểm tra nếu không có rating, mặc định cho rating = 5
    const feedbackRating = rating || 5;

    const newFeedback = await Feedback.create({
      customer_id,
      tour_id,
      description_feedback,
      rating: feedbackRating,
      feedback_date,
    });

    res.status(201).json({
      message: "Tạo feedback cho tour thành công!",
      data: newFeedback,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi tạo feedback cho tour",
      error: error.message,
    });
  }
};

// Tạo feedback cho Travel Guide
exports.createFeedbackForTravelGuide = async (req, res) => {
  try {
    const {
      customer_id,
      travel_guide_id,
      description_feedback,
      rating,
      feedback_date,
    } = req.body;

    const customer = await Customer.findByPk(customer_id);
    if (!customer) {
      return res.status(404).json({ message: "Khách hàng không tồn tại!" });
    }

    const travelGuide = await TravelGuide.findByPk(travel_guide_id);
    if (!travelGuide) {
      return res.status(404).json({ message: "Hướng dẫn viên không tồn tại!" });
    }

    // Kiểm tra nếu không có rating, mặc định cho rating = 5
    const feedbackRating = rating || 5;

    const newFeedback = await Feedback.create({
      customer_id,
      travel_guide_id,
      description_feedback,
      rating: feedbackRating,
      feedback_date,
    });

    res.status(201).json({
      message: "Tạo feedback cho hướng dẫn viên thành công!",
      data: newFeedback,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi tạo feedback cho hướng dẫn viên",
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
      return res.status(404).json({ message: "Feedback không tồn tại!" });
    }

    // Cập nhật các trường thông tin trong feedback
    if (description_feedback != undefined)
      feedback.description_feedback =
        description_feedback || feedback.description_feedback;
    if (rating != undefined) feedback.rating = rating || feedback.rating;
    if (feedback_date != undefined)
      feedback.feedback_date = feedback_date || feedback.feedback_date;

    await feedback.save();

    res.status(200).json({
      message: "Cập nhật feedback thành công!",
      data: feedback,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi cập nhật feedback",
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
      return res.status(404).json({ message: "Feedback không tồn tại!" });
    }

    await feedback.destroy();

    res.status(200).json({
      message: "Xóa feedback thành công!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi xóa feedback",
      error: error.message,
    });
  }
};
