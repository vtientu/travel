const db = require("../models");
const Tour = db.Tour;

// Lấy danh sách tất cả Tour
exports.getAllTours = async (req, res) => {
    try {
        const tours = await Tour.findAll();
        res.json(tours);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Tạo một Tour mới
exports.createTour = async (req, res) => {
    try {
        const newTour = await Tour.create(req.body);
        res.status(201).json(newTour);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
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

