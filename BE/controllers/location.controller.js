const db = require("../models");
const Location = db.Location;

// Lấy danh sách tất cả Tour
exports.getAllLocations = async (req, res) => {
    try {
        const locations = await Location.findAll();
        res.json(locations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.createLocation = async (req, res) => {
    try {

        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: "Missing name in request body" });
        }

        const data = { name_location: name };
        await db.Location.bulkCreate([data]);

        res.json({ message: "Insert sample data successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



