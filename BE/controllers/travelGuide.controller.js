const db = require("../models");
const Sequelize = require("sequelize");
const TravelGuide = db.TravelGuide;
const User = db.User;
const Feedback = db.Feedback;
const Tour = db.Tour;
const Customer = db.Customer;
const TravelGuideLocation = db.TravelGuideLocation;
const Location = db.Location;

//Lấy tất cả TravelGuide
exports.getAllTravelGuides = async (req, res) => {
  try {
    const travelGuides = await TravelGuide.findAll();
    res.status(200).json({
      message: "Lấy danh sách hướng dẫn viên du lịch thành công!",
      data: travelGuides,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy danh sách hướng dẫn viên du lịch!",
      error: error.message,
    });
  }
};

//Lấy tất cả TravelGuide by ID
exports.getTravelGuidesByUser = async (req, res) => {
  try {
    const userId = req.params.user_id;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng!" });
    }

    const travelGuides = await TravelGuide.findByPk(userId);
    if (!travelGuides) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy hướng dẫn viên du lịch!" });
    }

    res.status(200).json({
      message: "Lấy danh sách hướng dẫn viên du lịch thành công!",
      data: travelGuides,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy danh sách hướng dẫn viên du lịch!",
      error: error.message,
    });
  }
};

// Lấy tất cả Feedback cho TravelGuide
exports.getFeedbackByTravelGuide = async (req, res) => {
  try {
    const travelGuideId = req.params.travelGuideId;

    const travelGuide = await TravelGuide.findByPk(travelGuideId);
    if (!travelGuide) {
      return res.status(404).json({ message: "Hướng dẫn viên không tồn tại!" });
    }

    // Lấy tất cả feedback của hướng dẫn viên
    const feedbacks = await Feedback.findAll({
      where: { travel_guide_id: travelGuideId },
      include: [
        { model: Tour, as: "tour" },
        {
          model: Customer,
          as: "customer",
          attributes: ["first_name", "last_name"],
        },
      ],
    });

    if (feedbacks.length === 0) {
      return res.status(404).json({
        message: "Không tìm thấy feedback nào cho hướng dẫn viên này",
      });
    }

    res.status(200).json({
      message: "Lấy feedback của hướng dẫn viên thành công!",
      data: feedbacks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy feedback của hướng dẫn viên",
      error: error.message,
    });
  }
};

//Tạo mới TravelGuide
exports.createTravelGuide = async (req, res) => {
  try {
    const {
      user_id,
      first_name,
      last_name,
      gender_guide,
      email,
      number_phone,
      birth_date,
      locations,
    } = req.body;

    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng!" });
    }

    const newTravelGuide = await TravelGuide.create({
      user_id,
      first_name,
      last_name,
      gender_guide,
      email,
      number_phone,
      birth_date,
    });

    // Gán các địa điểm phụ trách cho TravelGuide
    if (locations && locations.length > 0) {
      for (let locationId of locations) {
        await TravelGuideLocation.create({
          travel_guide_id: newTravelGuide.id,
          location_id: locationId,
        });
      }
    }

    res.status(201).json({
      message: "Tạo hướng dẫn viên du lịch thành công!",
      data: newTravelGuide,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi tạo hướng dẫn viên du lịch!",
      error: error.message,
    });
  }
};

//Cập nhật thông tin TravelGuide
exports.updateTravelGuide = async (req, res) => {
  try {
    const travelGuideId = req.params.id;
    const {
      first_name,
      last_name,
      gender_guide,
      email,
      number_phone,
      birth_date,
    } = req.body;

    const travelGuide = await TravelGuide.findByPk(travelGuideId);
    if (!travelGuide) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy hướng dẫn viên du lịch!" });
    }

    if (first_name != undefined)
      travelGuide.first_name = first_name || travelGuide.first_name;
    if (last_name != undefined)
      travelGuide.last_name = last_name || travelGuide.last_name;
    if (gender_guide != undefined)
      travelGuide.gender_guide = gender_guide || travelGuide.gender_guide;
    if (email != undefined) travelGuide.email = email || travelGuide.email;
    if (number_phone != undefined)
      travelGuide.number_phone = number_phone || travelGuide.number_phone;
    if (birth_date != undefined)
      travelGuide.birth_date = birth_date || travelGuide.birth_date;

    await travelGuide.save();

    res.status(200).json({
      message: "Cập nhật thông tin hướng dẫn viên du lịch thành công!",
      data: travelGuide,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi cập nhật thông tin hướng dẫn viên du lịch!",
      error: error.message,
    });
  }
};

//Xóa TravelGuide
exports.deleteTravelGuide = async (req, res) => {
  try {
    const travelGuideId = req.params.id;

    const travelGuide = await TravelGuide.findByPk(travelGuideId);
    if (!travelGuide) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy hướng dẫn viên du lịch!" });
    }

    await travelGuide.destroy();

    res.status(200).json({
      message: "Xóa hướng dẫn viên du lịch thành công!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi xóa hướng dẫn viên du lịch!",
      error: error.message,
    });
  }
};

// Lấy tất cả Tour cho TravelGuide dựa trên địa điểm phụ trách (đề xuất cho TravelGuide)
exports.getToursByTravelGuideLocation = async (req, res) => {
  try {
    const travelGuideId = req.params.travelGuideId;

    const travelGuide = await TravelGuide.findByPk(travelGuideId);
    if (!travelGuide) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy hướng dẫn viên!" });
    }

    // Lấy danh sách các địa điểm mà TravelGuide này phụ trách
    const locations = await TravelGuideLocation.findAll({
      where: { travel_guide_id: travelGuideId },
      include: [
        {
          model: Location,
          as: "location",
          attributes: ["id", "name_location"],
        },
      ],
    });

    const locationIds = locations.map((location) => location.location.id);

    // Tìm các Tour có liên quan đến các địa điểm phụ trách
    const tours = await Tour.findAll({
      where: {
        start_location: { [Sequelize.Op.in]: locationIds },
        end_location: { [Sequelize.Op.in]: locationIds },
      },
      include: [
        { model: Location, as: "startLocation" },
        { model: Location, as: "endLocation" },
      ],
    });

    res.status(200).json({
      message: "Lấy danh sách tour theo địa điểm phụ trách thành công!",
      data: tours,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy danh sách tour",
      error: error.message,
    });
  }
};
