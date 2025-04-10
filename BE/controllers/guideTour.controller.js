const db = require("../models");
const GuideTour = db.GuideTour;
const TravelGuide = db.TravelGuide;
const TravelTour = db.TravelTour;
const Tour = db.Tour;
const Location = db.Location;
const User = db.User;
const Booking = db.Booking;
const { Op } = require("sequelize");

// Lấy tất cả các tour mà một hướng dẫn viên tham gia bằng id
exports.getGuideTours = async (req, res) => {
  try {
    const travel_guide_id = req.params.id;

    const travelGuide = await TravelGuide.findByPk(travel_guide_id);
    if (!travelGuide) {
      return res
        .status(200)
        .json({ message: "Không tìm thấy hướng dẫn viên!" });
    }

    const guideTours = await GuideTour.findAll({
      where: { travel_guide_id: travel_guide_id },
      include: [
        {
          model: TravelTour,
          as: "travelTour",
        },
        {
          model: TravelGuide,
          as: "travelGuide",
        },
      ],
    });

    if (guideTours.length === 0) {
      return res
        .status(200)
        .json({ message: "Không tìm thấy tour nào cho hướng dẫn viên này!" });
    }

    res.status(200).json({
      message: "Lấy danh sách tour của hướng dẫn viên thành công!",
      data: guideTours,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy danh sách tour của hướng dẫn viên!",
      error: error.message,
    });
  }
};

// Thêm hướng dẫn viên vào một tour
exports.addGuideToTour = async (req, res) => {
  try {
    const { travel_tour_id, travel_guide_id } = req.body;

    const travelTour = await TravelTour.findByPk(travel_tour_id);
    if (!travelTour) {
      return res
        .status(200)
        .json({ message: "Không tìm thấy lịch khởi hành!" });
    }

    const travelGuide = await TravelGuide.findByPk(travel_guide_id);
    if (!travelGuide) {
      return res
        .status(200)
        .json({ message: "Không tìm thấy hướng dẫn viên!" });
    }

    const newGuideTour = await GuideTour.create({
      travel_tour_id,
      travel_guide_id,
      status: 0,
    });

    res.status(201).json({
      message: "Thêm hướng dẫn viên vào tour thành công!",
      data: newGuideTour,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi thêm hướng dẫn viên vào tour!",
      error: error.message,
    });
  }
};

// Xóa hướng dẫn viên khỏi tour
exports.removeGuideFromTour = async (req, res) => {
  try {
    const guideTourId = req.params.id;

    const guideTour = await GuideTour.findByPk(guideTourId);
    if (!guideTour) {
      return res
        .status(200)
        .json({ message: "Không tìm thấy hướng dẫn viên trong tour!" });
    }

    await guideTour.destroy();

    res.status(200).json({
      message: "Xóa hướng dẫn viên khỏi tour thành công!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi xóa hướng dẫn viên khỏi tour!",
      error: error.message,
    });
  }
};

exports.approveGuideTour = async (req, res) => {
  try {
    const guideTourId = req.params.id;

    const guideTour = await GuideTour.findByPk(guideTourId);  
    if (!guideTour) {
      return res
        .status(200)
        .json({ message: "Không tìm thấy hướng dẫn viên trong tour!" });
    }
    const travelGuide = await TravelGuide.findByPk(guideTour.travel_guide_id);
    if (!travelGuide) {
      return res
        .status(200)
        .json({ message: "Không tìm thấy hướng dẫn viên!" });
    }
    const travelTour = await TravelTour.findByPk(guideTour.travel_tour_id);
    if (!travelTour) {
      return res
        .status(200)
        .json({ message: "Không tìm thấy lịch khởi hành!" });
    }
    if (travelTour.status === 0) {
      travelTour.status = 1;
      await travelTour.save();
    } else {
      return res
        .status(400)
        .json({ message: "Tour đã có người nhận!" });
    }
    guideTour.status = 1;
    await guideTour.save();

    res.status(200).json({
      message: "Duyệt hướng dẫn viên thành công!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi duyệt hướng dẫn viên!",
      error: error.message,
    });
  }
};
exports.rejectGuideTour = async (req, res) => {
  try {
    const guideTourId = req.params.id;

    const guideTour = await GuideTour.findByPk(guideTourId);  
    if (!guideTour) {
      return res
        .status(200)
        .json({ message: "Không tìm thấy hướng dẫn viên trong tour!" });
    }
    const travelTour = await TravelTour.findByPk(guideTour.travel_tour_id);
    if (!travelTour) {
      return res
        .status(200)
        .json({ message: "Không tìm thấy lịch khởi hành!" });
    }
    if (travelTour.status === 1) {
      travelTour.status = 0;
      await travelTour.save();
    }
    guideTour.status = 2;
    await guideTour.save();

    res.status(200).json({
      message: "Từ chối hướng dẫn viên thành công!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi từ chối hướng dẫn viên!",
      error: error.message,
    });
  }
};
exports.getGuideTourByUserId = async (req, res) => {
  try {
    const userId = req.params.id;
    const { 
      page = 1, 
      limit = 10,
      start_location_id,
      end_location_id,
      name_tour,
      start_day,
      status,
      upcoming
    } = req.query;

    // Tạo điều kiện where cho Tour
    const tourWhereCondition = {};
    if (start_location_id) {
      tourWhereCondition.start_location = start_location_id;
    }
    if (end_location_id) {
      tourWhereCondition.end_location = end_location_id;
    }
    if (name_tour) {
      tourWhereCondition.name_tour = {
        [Op.like]: `%${name_tour}%`
      };
    }

    // Tạo điều kiện where cho TravelTour
    const travelTourWhereCondition = {};
    if (start_day) {
      travelTourWhereCondition.start_day = {
        [Op.gte]: new Date(start_day)
      };
    }

    // Filter theo status
    if (status) {
      travelTourWhereCondition.status = status;
    }

    // Filter tour sắp diễn ra (trong 7 ngày tới)
    if (upcoming === 'true') {
      const now = new Date();
      const sevenDaysLater = new Date(now);
      sevenDaysLater.setDate(now.getDate() + 7);
      
      travelTourWhereCondition.start_day = {
        [Op.between]: [now, sevenDaysLater]
      };
    }

    const offset = (page - 1) * limit;

    const { count, rows: guideTours } = await GuideTour.findAndCountAll({  
      where: { travel_guide_id: userId },
      include: [
        {
          model: TravelTour,
          as: "travelTour",
          where: travelTourWhereCondition,
          include: [{
            model: Tour,
            as: 'Tour',
            where: tourWhereCondition,
            include: [
              {
                model: Location,
                as: 'startLocation',
                attributes: ['id', 'name_location']
              },
              {
                model: Location,
                as: 'endLocation',
                attributes: ['id', 'name_location']
              }
            ]
          }]
        },
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });

    // Format lại dữ liệu trả về
    const formattedGuideTours = guideTours.map(guideTour => {
      const guideTourData = guideTour.get({ plain: true });
      return {
        ...guideTourData,
        travel_tour: {
          ...guideTourData.travelTour,
          tour: {
            ...guideTourData.travelTour.Tour,
            start_location: guideTourData.travelTour.Tour.startLocation || null,
            end_location: guideTourData.travelTour.Tour.endLocation || null
          }
        }
      };
    });

    res.status(200).json({
      message: "Lấy danh sách tour của hướng dẫn viên thành công!",
      data: {
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage: parseInt(page),
        items: formattedGuideTours
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({  
      message: "Lỗi khi lấy danh sách tour của hướng dẫn viên!",
      error: error.message,
    });
  }
};
exports.getTravelTourDetailForGuide = async (req, res) => {
  try {
    const { travelTourId } = req.params;

    // Lấy thông tin tour du lịch
    const travelTour = await TravelTour.findOne({
      where: { id: travelTourId },
      include: [
        {
          model: Tour,
          as: 'Tour',
          include: [
            {
              model: Location,
              as: 'startLocation',
              attributes: ['id', 'name_location']
            },
            {
              model: Location,
              as: 'endLocation',
              attributes: ['id', 'name_location']
            }
          ]
        }
      ]
    });

    if (!travelTour) {
      return res.status(200).json({ message: "Không tìm thấy tour du lịch!" });
    }
    
    // Lấy thông tin hướng dẫn viên của tour
    const guideTours = await GuideTour.findAll({
      where: { travel_tour_id: travelTourId },
      include: [
        {
          model: TravelGuide,
          as: 'travelGuide',
          include: [
            {
              model: User,
              as: 'user',
            }
          ]
        }
      ]
    });
    const bookings = await Booking.findAll({
      where: { travel_tour_id: travelTourId }
    });

    // Format lại dữ liệu trả về
    const formattedTravelTour = {
      id: travelTour.id,
      tour_id: travelTour.tour_id,
      start_day: travelTour.start_day,
      end_day: travelTour.end_day,
      status: travelTour.status,
      active: travelTour.active,
      price: travelTour.price,
      current_people: travelTour.current_people,
      max_people: travelTour.max_people,
      tour: {
        id: travelTour.Tour.id,
        name_tour: travelTour.Tour.name_tour,
        start_location: travelTour.Tour.startLocation,
        end_location: travelTour.Tour.endLocation
      },
      guides: guideTours.map(guideTour => ({
        id: guideTour.travelGuide.id,
        gender: guideTour.travelGuide.gender_guide,
        first_name: guideTour.travelGuide.first_name,
        last_name: guideTour.travelGuide.last_name,
        email: guideTour.travelGuide.email,
        phone: guideTour.travelGuide.number_phone,
        address: guideTour.travelGuide.address,
        avatar: guideTour.travelGuide.user.avatar,
        display_name: guideTour.travelGuide.user.displayName,
      })),
      bookings: bookings.map(booking => ({
        id: booking.id,
        status: booking.status,
        number_children: booking.number_children,
        number_adult: booking.number_adult,
        number_toddler: booking.number_toddler,
        number_newborn: booking.number_newborn,
        booking_date: booking.booking_date,
        total_cost: booking.total_cost,
        name: booking.name,
        email: booking.email,
        phone: booking.phone,
        address: booking.address,
        note: booking.note,
        booking_code: booking.booking_code,
      }))
    };

    res.json({
      message: "Lấy thông tin tour du lịch thành công!",
      data: formattedTravelTour
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Lỗi khi lấy thông tin tour du lịch",
      error: error.message,
    });
  }
};
