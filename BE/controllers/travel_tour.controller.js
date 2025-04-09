const db = require("../models");
const TravelTour = db.TravelTour;
const Tour = db.Tour;

//Lấy tất cả dữ liệu trong bảng travel tour
exports.getAllTravelTours = async (req, res) => {
  try {
    const { status } = req.query;
    
    // Tạo điều kiện where
    const whereCondition = {};
    if (status !== undefined) {
      whereCondition.status = status;
    }

    const travelTours = await TravelTour.findAll({
      where: whereCondition,
      include: [{
        model: Tour,
        as: 'Tour',
        // attributes: ['id', 'name_tour', 'price_tour', 'day_number', 'rating_tour', 'max_people', 'image']
      }],
      order: [['start_day', 'ASC']]
    });

    // Format lại dữ liệu trả về
    const formattedTravelTours = travelTours.map(travelTour => {
      const travelTourData = travelTour.get({ plain: true });
      return {
        ...travelTourData,
        tour: travelTourData.Tour || null
      };
    });

    res.json({
      message: "Lấy danh sách tour thành công!",
      data: formattedTravelTours
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Lỗi khi lấy danh sách tour!",
      error: error.message
    });
  }
};

//Lấy thông tin travel tour theo ID
exports.getTravelTourById = async (req, res) => {
  try {
    const travelTourId = req.params.id;
    const travelTour = await TravelTour.findByPk(travelTourId, {
      include: [{
        model: Tour,
        as: 'Tour',
      }]
    });

    if (!travelTour) {
      return res.status(404).json({ message: "Không tìm thấy tour du lịch!" });
    }

    // Format lại dữ liệu trả về
    const formattedTravelTour = {
      ...travelTour.get({ plain: true }),
      tour: travelTour.Tour || null
    };

    res.json({
      message: "Lấy thông tin tour du lịch thành công!",
      data: formattedTravelTour
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy thông tin tour du lịch với id=" + req.params.id,
      error: error.message,
    });
  }
};

//Lấy thông tin travel tour theo tour_id
exports.getTravelTourByTourId = async (req, res) => {
  try {
    const tourId = req.params.id;
    const travelTour = await TravelTour.findAll({ where: { tour_id: tourId } });

    if (!travelTour || travelTour.length === 0) {
      return res.status(404).json({
        message: "Không tìm thấy tour du lịch!",
      });
    }

    res.json(travelTour);
  } catch (error) {
    res.status(500).json({
      message:
        "Lỗi khi lấy thông tin tour du lịch với tour_id=" + req.params.id,
      error: error.message,
    });
  }
};

//Tạo travel tour mới
exports.createTravelTour = async (req, res) => {
  try {
    const {
      tour_id,
      start_day,
      end_day,
      price_tour,
      max_people,
      start_time_depart,
      end_time_depart,
      start_time_close,
      end_time_close,
      children_price,
      toddler_price,
    } = req.body;

    if (
      !tour_id ||
      !start_day ||
      !end_day ||
      !price_tour ||
      !max_people ||
      !start_time_depart ||
      !end_time_depart ||
      !start_time_close ||
      !end_time_close ||
      !children_price ||
      !toddler_price
    ) {
      return res.status(400).json({ message: "Thiếu thông tin bắt buộc!" });
    }

    const data = {
      tour_id,
      start_day,
      end_day,
      price_tour,
      max_people,
      start_time_depart,
      end_time_depart,
      start_time_close,
      end_time_close,
      children_price,
      toddler_price,
      status: 0,
      active: 1,
    };
    const Tour = await db.Tour.findByPk(tour_id);
    if (!Tour) {
      return res.status(404).json({ message: "Không tìm thấy tour!" });
    }
    /// Validate thời gian khởi hành và kết thúc
    if (start_time_depart >= end_time_depart) {
      return res.status(400).json({
        message:
          "Thời gian khởi hành phải trước thời gian kết thúc cho ngày khởi hành!",
      });
    }
    if (start_time_close >= end_time_close) {
      return res.status(400).json({
        message:
          "Thời gian khởi hành phải trước thời gian kết thúc cho ngày kết thúc!",
      });
    }

    //Validate ngày bắt đầu và ngày kết thúc
    if (start_day < Date.now()) {
      return res
        .status(400)
        .json({ message: "Ngày bắt đầu phải ở tương lai!" });
    }
    if (end_day < start_day) {
      return res
        .status(400)
        .json({ message: "Ngày kết thúc phải sau ngày bắt đầu!" });
    }

    //Validate giá tour và số người
    if (price_tour < 0) {
      return res.status(400).json({ message: "Giá tour phải lớn hơn 0!" });
    }
    if (max_people < 0) {
      return res.status(400).json({ message: "Số người phải lớn hơn 0!" });
    }

    const newTravelTour = await db.TravelTour.create(data);
    res.json({
      message: "Tạo tour du lịch mới thành công!",
      tour: newTravelTour,
    });
  } catch (error) {
    console.error("Lỗi khi thêm tour:", error);
    res.status(500).json({ error: error.message });
  }
};

//Xóa travel tour theo ID
exports.deleteTravelTour = async (req, res) => {
  try {
    const travelTourId = req.params.id;
    const travelTour = await TravelTour.findByPk(travelTourId);

    if (!travelTour) {
      return res.status(404).json({ message: "Không tìm thấy tour du lịch!" });
    }

    await travelTour.destroy();
    res.json({ message: "Xóa tour du lịch thành công!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Cập nhật thông tin travel tour theo ID
exports.updateTravelTour = async (req, res) => {
  try {
    const travelTourId = req.params.id;
    const travelTour = await TravelTour.findByPk(travelTourId);

    if (!travelTour) {
      return res.status(404).json({ message: "Không tìm thấy tour du lịch!" });
    }

    const {
      tour_id,
      start_day,
      end_day,
      price_tour,
      max_people,
      start_time_depart,
      end_time_depart,
      start_time_close,
      end_time_close,
      children_price,
      toddler_price,
    } = req.body;

    // Validate thời gian khởi hành và kết thúc
    if (start_time_depart >= end_time_depart) {
      return res.status(400).json({
        message:
          "Thời gian khởi hành phải trước thời gian kết thúc cho ngày khởi hành!",
      });
    }
    if (start_time_close >= end_time_close) {
      return res.status(400).json({
        message:
          "Thời gian khởi hành phải trước thời gian kết thúc cho ngày kết thúc!",
      });
    }

    // Validate thời gian kết thúc phải sau thời gian khởi hành
    if (start_day < Date.now()) {
      return res
        .status(400)
        .json({ message: "Ngày bắt đầu phải ở tương lai!" });
    }
    if (end_day < start_day) {
      return res
        .status(400)
        .json({ message: "Ngày kết thúc phải sau ngày bắt đầu!" });
    }

    // Validate giá tour
    if (price_tour < 0) {
      return res.status(400).json({ message: "Giá tour phải lớn hơn 0!" });
    }

    if (max_people < 0) {
      return res.status(400).json({ message: "Số người phải lớn hơn 0!" });
    }
    if (tour_id !== undefined) travelTour.tour_id = tour_id;
    if (start_day !== undefined) travelTour.start_day = start_day;
    if (end_day !== undefined) travelTour.end_day = end_day;
    if (price_tour !== undefined) travelTour.price_tour = price_tour;
    if (max_people !== undefined) travelTour.max_people = max_people;
    if (start_time_depart !== undefined)
      travelTour.start_time_depart = start_time_depart;
    if (end_time_depart !== undefined)
      travelTour.end_time_depart = end_time_depart;
    if (start_time_close !== undefined)
      travelTour.start_time_close = start_time_close;
    if (end_time_close !== undefined)
      travelTour.end_time_close = end_time_close;
    if (children_price !== undefined) travelTour.children_price = children_price;
    if (toddler_price !== undefined) travelTour.toddler_price = toddler_price;  
    await travelTour.save();
    res.json({
      message: "Cập nhật tour du lịch thành công!",
      data: travelTour,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi cập nhật tour du lịch với id=" + req.params.id,
      error: error.message,
    });
  }
};

// Đóng Tour tự động khi đủ số lượng người đăng ký
exports.closeTourWhenFull = async (req, res) => {
  try {
    const travelTourId = req.params.id;

    const travelTour = await TravelTour.findByPk(travelTourId);
    if (!travelTour) {
      return res.status(404).json({ message: "Không tìm thấy tour!" });
    }

    if (travelTour.current_people >= travelTour.max_people) {
      travelTour.active = false;
      await travelTour.save();

      res.status(200).json({
        message: "Tour đã được đóng vì đã đủ số lượng người đăng ký!",
        data: travelTour,
      });
    } else {
      res.status(400).json({
        message: "Tour chưa đủ số lượng người đăng ký để đóng.",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi đóng tour",
      error: error.message,
    });
  }
};
