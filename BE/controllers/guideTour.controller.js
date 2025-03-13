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
      return res.status(404).json({ message: "Travel guide not found!" });
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
        .json({ message: "No tours found for this guide!" });
    }

    res.status(200).json({
      message: "Guide tours fetched successfully!",
      data: guideTours,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving guide tours!",
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
      return res.status(404).json({ message: "DepartureSchedule not found!" });
    }

    const travelGuide = await TravelGuide.findByPk(travel_guide_id);
    if (!travelGuide) {
      return res.status(404).json({ message: "Travel guide not found!" });
    }

    const newGuideTour = await GuideTour.create({
      travel_tour_id,
      travel_guide_id,
    });

    res.status(201).json({
      message: "Guide added to tour successfully!",
      data: newGuideTour,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding guide to tour",
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
      return res.status(404).json({ message: "Guide tour not found!" });
    }

    await guideTour.destroy();

    res.status(200).json({
      message: "Guide removed from tour successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error removing guide from tour",
      error: error.message,
    });
  }
};
