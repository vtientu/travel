const db = require("../models");
const TravelTour = db.TravelTour;

//Lấy tất cả dữ liệu trong bảng travel tour
exports.getAllTravelTours = async (req, res) => {
  try {
    const filter = req.params.filter;
    // if (filter == 'about') {
    //   const travelTours = await TravelTour.findAll({
    //     where: {
    //       status: 1,
    //       start_time: {
    //         [Op.lt]: new Date()
    //       }
    //     }
    //   });

    // }
    // if (filter == 'now') {
    //   const travelTours = await TravelTour.findAll({
    //     where: {
    //       status: 1,
    //       start_time: {
    //         [Op.lt]: new Date()
    //       }
    //     }
    //   });
    // }
    // if (filter == 'finish') {
    //   const travelTours = await TravelTour.findAll({
    //     where: {
    //       status: 2,
    //       end_time: {
    //         [Op.lt]: new Date()
    //       }
    //     }
    //   });
    // }
    // else {
    //   const travelTours = await TravelTour.findAll();
    // }
    const travelTours = await TravelTour.findAll();
    res.json({ travelTours });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Lấy thông tin travel tour theo ID
exports.getTravelTourById = async (req, res) => {
  try {
    const travelTourId = req.params.id;
    const travelTour = await TravelTour.findByPk(travelTourId);

    if (!travelTour) {
      return res.status(404).json({ message: "Không tìm thấy tour du lịch!" });
    }

    res.json(travelTour);
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
    const { tour_id, start_time, end_time, price_tour, max_people } = req.body;

    if (!tour_id || !start_time || !end_time || !price_tour || !max_people) {
      return res.status(400).json({ message: "Thiếu thông tin bắt buộc!" });
    }

    const data = {
      tour_id,
      start_time,
      end_time,
      price_tour,
      max_people,
    };
    const Tour = await db.Tour.findByPk(tour_id);
    if (!Tour) {
      return res.status(404).json({ message: "Không tìm thấy tour!" });
    }
    if (start_time < Date.now()) {
      return res
        .status(400)
        .json({ message: "Thời gian bắt đầu phải ở tương lai!" });
    }
    if (end_time < start_time) {
      return res
        .status(400)
        .json({ message: "Thời gian kết thúc phải sau thời gian bắt đầu!" });
    }
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

    const { tour_id, start_time, end_time, price_tour, max_people } = req.body;

    if (tour_id !== undefined) travelTour.tour_id = tour_id;
    if (start_time !== undefined) travelTour.start_time = start_time;
    if (end_time !== undefined) travelTour.end_time = end_time;
    if (price_tour !== undefined) travelTour.price_tour = price_tour;
    if (max_people !== undefined) travelTour.max_people = max_people;

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
