const db = require("../models");
const TourService = db.TourService;

// Lấy danh sách tất cả Tour
// exports.getAllServices = async (req, res) => {
//     try {
//         const locations = await Service.findAll();
//         res.json(locations);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };
exports.createTourService = async (req, res) => {
    try {

        const { tour_id, service_id } = req.body;

        const data = { tour_id: tour_id, service_id: service_id };
        const newTourService = await db.TourService.create(data);
        console.log(data)
        res.json({ message: "Insert data successfully!", data: newTourService });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



