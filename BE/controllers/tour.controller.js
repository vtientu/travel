const db = require("../models");
const Tour = db.Tour;
const Location = db.Location;

// Lấy danh sách tất cả Tour
// exports.getAllTours = async (req, res) => {
//   try {
//     const tours = await Tour.findAll();
//     res.json(tours);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

//Lấy danh sách tất cả Tour
exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.findAll({
      include: [
        {
          model: db.Location,
          attributes: ["name_location"],
        },
      ],
    });
    res.json(tours);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Lấy thông tin Tour theo ID
exports.getTourById = async (req, res) => {
  try {
    const tourId = req.params.id;
    const tour = await Tour.findByPk(tourId, {
      include: [
        { model: Location, as: "startLocation" },
        { model: Location, as: "endLocation" },
      ],
    });

    if (!tour) {
      return res.status(404).json({ message: "Tour not found!" });
    }

    res.json(tour);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving tour with id=" + req.params.id,
      error: error.message,
    });
  }
};

//Tạo một Tour mới
exports.createTour = async (req, res) => {
  try {
    const {
      location_id,
      name_tour,
      price_tour,
      day_number,
      rating_tour,
      max_people,
      activity_description,
      start_location,
      end_location,
    } = req.body;

    const image = req.file ? `/uploads/tourImage/${req.file.filename}` : null;

    if (
      !location_id ||
      !name_tour ||
      !price_tour ||
      !day_number ||
      !rating_tour ||
      !max_people ||
      !activity_description ||
      !start_location ||
      !end_location
    ) {
      return res.status(400).json({
        message: "Please provide all required fields!",
      });
    }

    const data = {
      location_id,
      name_tour,
      price_tour,
      day_number,
      rating_tour,
      max_people,
      activity_description,
      image,
      start_location,
      end_location,
    };
    const newTour = await db.Tour.create(data);
    res.json({
      message: "Create tour successfully!",
      tour: newTour,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error inserting tour",
      error: error.message,
    });
  }
};

//Xóa một Tour theo ID
exports.deleteTourById = async (req, res) => {
  try {
    const tourId = req.params.id;
    const tour = await db.Tour.findByPk(tourId);

    if (!tour) {
      return res.status(404).json({ message: "Tour not found!" });
    }

    await tour.destroy();
    res.json({
      message: "Delete tour successfully!",
      data: tour,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting tour",
      error: error,
    });
  }
};

//Cập nhật thông tin Tour
exports.updateTourById = async (req, res) => {
  try {
    const tourId = req.params.id;
    const tour = await db.Tour.findByPk(tourId);

    if (!tour) {
      return res.status(404).json({ message: "Tour not found!" });
    }

    const image = req.file
      ? `/uploads/tourImage/${req.file.filename}`
      : tour.image;

    if (req.body.location_id !== undefined)
      tour.location_id = req.body.location_id;
    if (req.body.name_tour !== undefined) tour.name_tour = req.body.name_tour;
    if (req.body.price_tour !== undefined)
      tour.price_tour = req.body.price_tour;
    if (req.body.day_number !== undefined)
      tour.day_number = req.body.day_number;
    if (req.body.rating_tour !== undefined)
      tour.rating_tour = req.body.rating_tour;
    if (req.body.max_people !== undefined)
      tour.max_people = req.body.max_people;
    if (req.body.activity_description !== undefined)
      tour.activity_description = req.body.activity_description;
    if (req.body.start_location !== undefined)
      tour.start_location = req.body.start_location;
    if (req.body.end_location !== undefined)
      tour.end_location = req.body.end_location;
    if (req.file) tour.image = image;

    await tour.save();
    res.json({
      message: "Update tour successfully!",
      data: tour,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating tour",
      error: error,
    });
  }
};

//Thêm dữ liệu mẫu
exports.insertSampleData = async (req, res) => {
  try {
    const sampleData = [
      {
        location_id: 1,
        name_tour: "Tour Hà Nội",
        price_tour: 5000000,
        day_number: 3,
        type_tour_id: 1,
        rating_tour: 5,
        max_people: 20,
        activity_description: "Tham quan Hà Nội 3 ngày 2 đêm.",
      },
      {
        location_id: 2,
        name_tour: "Tour Đà Nẵng",
        price_tour: 7000000,
        day_number: 4,
        type_tour_id: 2,
        rating_tour: 4,
        max_people: 15,
        activity_description: "Khám phá Đà Nẵng và Hội An.",
      },
    ];

    await db.Tour.bulkCreate(sampleData);
    res.json({ message: "Insert sample data successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getTourByLocationId = async (req, res) => {
  try {
    const locationId = req.params.locationId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows: tours } = await Tour.findAndCountAll({
      where: { end_location: locationId },
      include: [
        { model: Location, as: "startLocation" },
        { model: Location, as: "endLocation" },
      ],
      limit,
      offset,
    });

    if (!tours || tours.length === 0) {
      return res.status(404).json({ message: "Tour not found!" });
    }

    res.json({
      totalTours: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      tours,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error retrieving tour with locationId=${req.params.locationId}`,
      error: error.message,
    });
  }
};
