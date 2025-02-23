const db = require("../models");
const Location = db.Location;

// Lấy danh sách tất cả Tour
exports.getAllLocations = async (req, res) => {
  try {
    const locations = await Location.findAll();
    res.json(locations);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving locations!",
      error: error.message,
    });
  }
};

//Lấy một Location theo ID
exports.getLocationById = async (req, res) => {
  try {
    const id = req.params.id;
    const location = await Location.findByPk(id);
    if (!location) {
      return res.status(404).json({
        message: "Location not found!",
      });
    }
    res.json(location);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving location!",
      error: error.message,
    });
  }
};

//Tạo một Location mới
exports.createLocation = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        message: "Please enter location name!",
      });
    }
    const data = { name_location: name };

    const location = await Location.create(data);
    res.json({
      message: "Location created successfully!",
      data: location,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating location!",
      error: error.message,
    });
  }
};

//Xóa một Location theo ID
exports.deleteLocation = async (req, res) => {
  try {
    const id = req.params.id;
    const location = await Location.findByPk(id);
    if (!location) {
      return res.status(404).json({
        message: "Location not found!",
      });
    }
    await location.destroy();
    res.json({
      message: "Location deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting location!",
      error: error.message,
    });
  }
};

//Cap nhat Location theo ID
exports.updateLocation = async (req, res) => {
  try {
    const id = req.params.id;
    const location = await Location.findByPk(id);
    if (!location) {
      return res.status(404).json({
        message: "Location not found!",
      });
    }
    const { name_location } = req.body;

    if (name_location != undefined) location.name_location = name_location;
    await location.save();
    res.json({
      message: "Location updated successfully!",
      data: location,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating location!",
      error: error.message,
    });
  }
};
