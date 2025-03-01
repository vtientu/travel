const db = require("../models");
const Tour = db.Tour;
const Location = db.Location;
const TypeTour = db.TypeTour;
const TravelTour = db.TravelTour;

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
                {model: Location, as: "startLocation"},
                {model: Location, as: "endLocation"},
            ],
        });
        res.json(tours);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

//Lấy thông tin Tour theo ID
exports.getTourById = async (req, res) => {
    try {
        const tourId = req.params.id;
        const tour = await Tour.findByPk(tourId, {
            include: [
                {model: Location, as: "startLocation"},
                {model: Location, as: "endLocation"},
            ],
        });

        if (!tour) {
            return res.status(404).json({message: "Tour not found!"});
        }

        res.json(tour);
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving tour with id=" + req.params.id,
            error: error.message,
        });
    }
};

// Tạo`code_tour` = `[Loại Tour] + [Điểm khởi hành] + [STT]`
const generateTourCode = async (type_id, start_location) => {
    try {
        const typeTour = await TypeTour.findByPk(type_id);
        if (!typeTour) {
            console.error("Error: TypeTour not found");
            return null;
        }

        // Tạo mã loại tour viết tắt
        const tourTypeCode = typeTour.name_type
            .split(" ")
            .map((word) => word[0])
            .join("")
            .toUpperCase();

        // Lấy mã điểm khởi hành (viết tắt 2 ký tự đầu)
        const locationCode = start_location
            .toString()
            .substring(0, 2)
            .toUpperCase();

        // Đếm số lượng tour hiện có cùng loại
        const tourCount = await Tour.count({where: {type_id}});

        // Số thứ tự (định dạng 001, 002, ...)
        const sequenceNumber = String(tourCount + 1).padStart(3, "0");

        return `${tourTypeCode}-${locationCode}-${sequenceNumber}`;
    } catch (error) {
        console.error("Error generating tour code:", error);
        return null;
    }
};

//Tạo một Tour mới
exports.createTour = async (req, res) => {
    try {
        const {
            type_id,
            service_id,
            name_tour,
            price_tour,
            day_number,
            rating_tour,
            max_people,
            activity_description,
            start_location,
            end_location,
            available_month,
        } = req.body;
        const travel_tours = req.body.travel_tours ? JSON.parse(req.body.travel_tours) : [];

        const image = req.file ? `/uploads/tourImage/${req.file.filename}` : null;

        const startLoc = await Location.findByPk(Number(start_location));
        const endLoc = await Location.findByPk(Number(end_location));

        if (!startLoc || !endLoc) {
            return res
                .status(400)
                .json({message: "Start or End location does not exist!"});
        }

        if (
            !type_id ||
            !service_id ||
            !name_tour ||
            !price_tour ||
            !day_number ||
            !rating_tour ||
            !max_people ||
            !activity_description ||
            !start_location ||
            !end_location ||
            !available_month ||
            !image
        ) {
            console.error("Missing fields:", req.body);
            return res.status(400).json({
                message: "Please provide all required fields!",
            });
        }
        // Tạo `code_tour`
        const code_tour = await generateTourCode(type_id, startLoc.id);
        if (!code_tour) {
            return res.status(500).json({message: "Error generating tour code!"});
        }

        if (!code_tour || code_tour.trim() === "") {
            return res.status(400).json({message: "Invalid tour code generated!"});
        }

        const tourData = {
            type_id: Number(type_id),
            service_id: Number(service_id),
            name_tour,
            price_tour: Number(price_tour),
            day_number: Number(day_number),
            rating_tour: Number(rating_tour),
            max_people: Number(max_people),
            activity_description,
            image,
            start_location: Number(start_location),
            end_location: Number(end_location),
            available_month,
            code_tour,
        };

        const newTour = await Tour.create(tourData);

        if (travel_tours && travel_tours.length > 0) {
            const travelTourData = travel_tours.map(tour => ({
                ...tour,
                tour_id: newTour.id,
            }));

            await TravelTour.bulkCreate(travelTourData);
            res.json({
                message: "Create tour and travel tour successfully!",
                tour: newTour,
                travel_tours: travelTourData,
            });
        } else {
            res.json({
                message: "Create tour successfully!",
                tour: newTour,
            });
        }


    } catch (error) {
        console.error("Error:", error);
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
            return res.status(404).json({message: "Tour not found!"});
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
            return res.status(404).json({message: "Tour not found!"});
        }

        const image = req.file
            ? `/uploads/tourImage/${req.file.filename}`
            : tour.image;

        if (req.body.type_id !== undefined) tour.type_id = req.body.type_id;
        if (req.body.service_id !== undefined)
            tour.service_id = req.body.service_id;
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
        if (req.body.available_month !== undefined)
            tour.available_month = req.body.available_month;
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

exports.getTourByLocationId = async (req, res) => {
    try {
        const locationId = req.params.locationId;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const {count, rows: tours} = await Tour.findAndCountAll({
            where: {end_location: locationId},
            include: [
                {model: Location, as: "startLocation"},
                {model: Location, as: "endLocation"},
            ],
            limit,
            offset,
        });

        if (!tours || tours.length === 0) {
            return res.status(404).json({message: "Tour not found!"});
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
