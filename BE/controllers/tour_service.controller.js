const db = require("../models");
const TourService = db.TourService;

//Lấy danh sách tất cả TourService
exports.getAllTourServices = async (req, res) => {
  try {
    const tourServices = await TourService.findAll();
    res.json(tourServices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Lấy thông tin TourService theo ID
exports.getTourServiceById = async (req, res) => {
  try {
    const tourServiceId = req.params.id;
    const tourService = await TourService.findByPk(tourServiceId);

    if (!tourService) {
      return res.status(404).json({ message: "TourService not found!" });
    }

    res.json(tourService);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving tourService with id=" + req.params.id,
      error: error.message,
    });
  }
};

//Tạo một TourService mới
exports.createTourService = async (req, res) => {
  try {
    const { tour_id, service_id } = req.body;

    if (!tour_id || !service_id) {
      return res.status(400).json({ message: "Missing required information!" });
    }

    const newTourService = {
      tour_id,
      service_id,
    };

    const tourService = await TourService.create(newTourService);
    res.json({
      message: "New TourService created successfully!",
      data: tourService,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating TourService",
      error: error.message,
    });
  }
};

//Xóa TourService theo ID
exports.deleteTourService = async (req, res) => {
  try {
    const tourServiceId = req.params.id;
    const tourService = await TourService.findByPk(tourServiceId);

    if (!tourService) {
      return res.status(404).json({ message: "TourService not found!" });
    }

    await tourService.destroy();
    res.json({ message: "TourService deleted successfully!" });
  } catch (error) {
    res.status(500).json({
      message: "Could not delete TourService",
      error: error.message,
    });
  }
};

//Cập nhật thông tin TourService
exports.updateTourService = async (req, res) => {
  try {
    const tourServiceId = req.params.id;
    const tourService = await TourService.findByPk(tourServiceId);

    if (!tourService) {
      return res.status(404).json({ message: "TourService not found!" });
    }

    const { tour_id, service_id } = req.body;

    if (tour_id !== undefined) tourService.tour_id = tour_id;
    if (service_id !== undefined) tourService.service_id = service_id;

    await tourService.save();
    res.json({
      message: "TourService updated successfully!",
      data: tourService,
    });
  } catch (error) {
    res.status(500).json({
      message: "Could not update TourService",
      error: error.message,
    });
  }
};
