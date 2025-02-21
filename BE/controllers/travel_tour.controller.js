const db = require("../models");
const TravelTour = db.TravelTour;

// Lấy danh sách tất cả TravelTour
// exports.getAllTravelTours = async (req, res) => {
//     try {
//         const tours = await TravelTour.findAll();
//         res.json(tours);
//     } catch (error) {
//         res.status(500).json({error: error.message});
//     }
// };
exports.createTravelTour = async (req, res) => {
    try {
        const {tour_id, start_time, end_time, price_tour} = req.body;

        const data = {
            tour_id,
            start_time,
            end_time,
            price_tour
        };

        console.log("🔍 Data to insert:", data);

        const newTravelTour = await db.TravelTour.create(data);
        res.json({message: "Insert sample data successfully!", tour: newTravelTour});
    } catch (error) {
        console.error("❌ Error inserting tour:", error);
        res.status(500).json({error: error.message});
    }
};


