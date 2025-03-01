const db = require("../models");
const TravelTour = db.TravelTour;

//Lấy tất cả dữ liệu trong bảng travel tour
exports.getAllTravelTours = async (req, res) => {
  try {
    const travelTours = await TravelTour.findAll();
    res.json({ travelTours });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Lấy thông tin travel tour theo ID
exports.getTravelTourById = async (req, res) => {
  try {
    const travelTourId = req.params.id;
    const travelTour = await TravelTour.findByPk(travelTourId);

    if (!travelTour) {
      return res.status(404).json({ message: "Travel tour not found!" });
    }

    res.json(travelTour);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving travel tour with id=" + req.params.id,
      error: error.message,
    });
  }
};

//Lấy thông tin travel tour theo tour_id
exports.getTravelTourByTourId = async (req, res) => {
  try {
    const tourId = req.params.id;
    const travelTour = await TravelTour.findAll({ where: { tour_id: tourId } });

    if (!travelTour || travelTour.length === 0) {
      return res.status(404).json({
        message: "Travel tour not found!",
      });
    }

    res.json(travelTour);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving travel tour with tour_id=" + req.params.id,
      error: error.message,
    });
  }
};

//Tạo travel tour mới
exports.createTravelTour = async (req, res) => {
  try {
    const { tour_id, start_time, end_time, price_tour, max_people } = req.body;

    if (!tour_id || !start_time || !end_time || !price_tour || !max_people) {
      return res.status(400).json({ message: "Missing required information!" });
    }

    const data = {
      tour_id,
      start_time,
      end_time,
      price_tour,
      max_people,
    };

    const newTravelTour = await db.TravelTour.create(data);
    res.json({
      message: "Create new travel tour successfully!",
      tour: newTravelTour,
    });
  } catch (error) {
    console.error("Error inserting tour:", error);
    res.status(500).json({ error: error.message });
  }
};

//Xóa travel tour theo ID
exports.deleteTravelTour = async (req, res) => {
  try {
    const travelTourId = req.params.id;
    const travelTour = await TravelTour.findByPk(travelTourId);

    if (!travelTour) {
      return res.status(404).json({ message: "Travel tour not found!" });
    }

    await travelTour.destroy();
    res.json({ message: "Delete travel tour successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Cập nhật thông tin travel tour theo ID
exports.updateTravelTour = async (req, res) => {
  try {
    const travelTourId = req.params.id;
    const travelTour = await TravelTour.findByPk(travelTourId);

    if (!travelTour) {
      return res.status(404).json({ message: "Travel tour not found!" });
    }

    const { tour_id, start_time, end_time, price_tour, max_people } = req.body;

    if (tour_id !== undefined) travelTour.tour_id = tour_id;
    if (start_time !== undefined) travelTour.start_time = start_time;
    if (end_time !== undefined) travelTour.end_time = end_time;
    if (price_tour !== undefined) travelTour.price_tour = price_tour;
    if (max_people !== undefined) travelTour.max_people = max_people;

    await travelTour.save();
    res.json({
      message: "Update travel tour successfully!",
      data: travelTour,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating travel tour with id=" + req.params.id,
      error: error.message,
    });
  }
};
