const db = require("../models");
const TourActivities = db.TourActivities;
const Tour = db.Tour;

// Tạo hoạt động mới cho tour
exports.createTourActivities = async (req, res) => {
  try {
    const { tour_id, day, title, description, detail } = req.body;
    const image = req.file ? req.file.path : null;

    // Kiểm tra tour có tồn tại không
    const tour = await Tour.findByPk(tour_id);
    if (!tour) {
      return res.status(404).json({
        message: "Tour không tồn tại!",
      });
    }

    // Kiểm tra dữ liệu đầu vào
    if (!day || !title) {
      return res.status(400).json({
        message: "Vui lòng nhập ngày và tiêu đề hoạt động!",
      });
    }

    // Kiểm tra ngày phải là số dương và không vượt quá số ngày của tour
    if (day <= 0 || day > tour.day_number) {
      return res.status(400).json({
        message: `Ngày phải từ 1 đến ${tour.day_number}!`,
      });
    }

    // Kiểm tra xem ngày này đã có hoạt động chưa
    const existingActivity = await TourActivities.findOne({
      where: {
        tour_id,
        day,
      },
    });

    if (existingActivity) {
      return res.status(400).json({
        message: `Ngày ${day} đã có hoạt động!`,
      });
    }

    if (!image) {
      return res.status(400).json({
        message: "Vui lòng chọn ảnh cho hoạt động!",
      });
    }

    // Tạo hoạt động mới
    const newActivity = await TourActivities.create({
      tour_id,
      day,
      title,
      description,
      detail,
      image,
    });

    res.status(201).json({
      message: "Thêm hoạt động tour thành công!",
      data: newActivity,
    });
  } catch (error) {
    console.error("Error creating tour activity:", error);
    res.status(500).json({
      message: "Lỗi khi thêm hoạt động tour!",
      error: error.message,
    });
  }
};
