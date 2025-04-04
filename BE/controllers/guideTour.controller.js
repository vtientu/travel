const db = require("../models");
const GuideTour = db.GuideTour;
const TravelGuide = db.TravelGuide;
const TravelTour = db.TravelTour;

// Lấy tất cả các tour mà một hướng dẫn viên tham gia bằng id
exports.getGuideTours = async (req, res) => {
  try {
    const travel_guide_id = req.params.id;

    const travelGuide = await TravelGuide.findByPk(travel_guide_id);
    if (!travelGuide) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy hướng dẫn viên!" });
    }

    const guideTours = await GuideTour.findAll({
      where: { travel_guide_id: travel_guide_id },
      include: [
        {
          model: TravelTour,
          as: "travelTour",
        },
        {
          model: TravelGuide,
          as: "travelGuide",
        },
      ],
    });

    if (guideTours.length === 0) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy tour nào cho hướng dẫn viên này!" });
    }

    res.status(200).json({
      message: "Lấy danh sách tour của hướng dẫn viên thành công!",
      data: guideTours,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy danh sách tour của hướng dẫn viên!",
      error: error.message,
    });
  }
};

// Thêm hướng dẫn viên vào một tour
exports.addGuideToTour = async (req, res) => {
  try {
    const { travel_tour_id, travel_guide_id } = req.body;

    const travelTour = await TravelTour.findByPk(travel_tour_id);
    if (!travelTour) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy lịch khởi hành!" });
    }

    const travelGuide = await TravelGuide.findByPk(travel_guide_id);
    if (!travelGuide) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy hướng dẫn viên!" });
    }

    const newGuideTour = await GuideTour.create({
      travel_tour_id,
      travel_guide_id,
    });

    res.status(201).json({
      message: "Thêm hướng dẫn viên vào tour thành công!",
      data: newGuideTour,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi thêm hướng dẫn viên vào tour!",
      error: error.message,
    });
  }
};

// Xóa hướng dẫn viên khỏi tour
exports.removeGuideFromTour = async (req, res) => {
  try {
    const guideTourId = req.params.id;

    const guideTour = await GuideTour.findByPk(guideTourId);
    if (!guideTour) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy hướng dẫn viên trong tour!" });
    }

    await guideTour.destroy();

    res.status(200).json({
      message: "Xóa hướng dẫn viên khỏi tour thành công!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi xóa hướng dẫn viên khỏi tour!",
      error: error.message,
    });
  }
};
