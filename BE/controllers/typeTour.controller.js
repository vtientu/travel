const db = require("../models");
const Tour = db.Tour;
const Location = db.Location;
const TypeTour = db.TypeTour;
const TravelTour = db.TravelTour;

exports.getAllTypeTours = async (req, res) => {
    try {
        const typeTours = await TypeTour.findAll();
        res.json(typeTours);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};
