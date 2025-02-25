const db = require("../models");
const TravelGuide = db.TravelGuide;
const User = db.User;

//Lấy tất cả TravelGuide
exports.getAllTravelGuides = async (req, res) => {
  try {
    const travelGuides = await TravelGuide.findAll();
    res.status(200).json({
      message: "Travel guides fetched successfully!",
      data: travelGuides,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving travel guides!",
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
      return res.status(404).json({ message: "User not found!" });
    }

    const travelGuides = await TravelGuide.findByPk(userId);
    if (!travelGuides) {
      return res.status(404).json({ message: "Travel guides not found!" });
    }

    res.status(200).json({
      message: "Travel guides fetched successfully!",
      data: travelGuides,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching travel guides",
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
    } = req.body;

    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
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

    res.status(201).json({
      message: "Travel guide created successfully!",
      data: newTravelGuide,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating travel guide",
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
      return res.status(404).json({ message: "Travel guide not found!" });
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
      message: "Travel guide updated successfully!",
      data: travelGuide,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating travel guide",
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
      return res.status(404).json({ message: "Travel guide not found!" });
    }

    await travelGuide.destroy();

    res.status(200).json({
      message: "Travel guide deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting travel guide",
      error: error.message,
    });
  }
};
