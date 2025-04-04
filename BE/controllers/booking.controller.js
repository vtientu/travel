const db = require("../models");
const Booking = db.Booking;
const Restaurant = db.Restaurant;
const RestaurantBooking = db.RestaurantBooking;
const Hotel = db.Hotel;
const HotelBooking = db.HotelBooking;
const Vehicle = db.Vehicle;
const VehicleBooking = db.VehicleBooking;
const TravelTour = db.TravelTour;
const User = db.User;
const Voucher = db.Voucher;
const Passenger = db.Passenger;
const nodemailer = require("nodemailer");
const Tour = db.Tour;

//Cấu hình nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "titi2024hd@gmail.com",
    pass: "mrwm vfbp dprc qwyu",
  },
});

// Format VND
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("vi-VN").format(amount);
};

// Format ngày tháng năm
const formatDate = (date) => {
  return new Intl.DateTimeFormat("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(date));
};

// Hàm gửi email xác nhận
const sendConfirmationEmail = (userEmail, bookingDetails) => {
  const {
    name,
    email,
    travelTour,
    name_tour,
    total_cost,
    start_time,
    end_time,
  } = bookingDetails;
  const { price_tour } = travelTour;

  const formattedPriceTour = formatCurrency(price_tour);
  const formattedTotalCost = formatCurrency(total_cost);
  const formattedStartDate = formatDate(start_time);
  const formattedEndDate = formatDate(end_time);

  const mailOptions = {
    from: '"Việt Du Ký" <titi2024hd@gmail.com>',
    to: userEmail,
    subject: "Xác nhận đặt tour",
    html: `
      <html>
        <body>
          <h1>Xác nhận đặt tour</h1>
          <p>Xin chào ${name},</p>
          <p>Đặt tour của bạn đã được hoàn tất thành công!</p>
          <p><strong>Thông tin tour:</strong></p>
          <ul>
            <li>Tour: ${name_tour}</li>
            <li>Ngày bắt đầu: ${formattedStartDate}</li>
            <li>Ngày kết thúc: ${formattedEndDate}</li>
            <li>Giá tour: ${formattedPriceTour} VND</li>
            <li>Tổng chi phí: ${formattedTotalCost} VND</li>
          </ul>
          <p>Cảm ơn bạn đã đặt tour cùng chúng tôi!</p>
        </body>
      </html>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Lỗi khi gửi email: ", error);
    } else {
      console.log("Email đã được gửi: " + info.response);
    }
  });
};

//Lấy danh sách tất cả booking
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: [
        { model: User, attributes: ["id", "email", "avatar"] },
        {
          model: TravelTour,
          attributes: ["id", "tour_id", "start_time", "end_time", "price_tour"],
        },
        {
          model: RestaurantBooking,
          include: [
            {
              model: Restaurant,
              attributes: [
                "id",
                "name_restaurant",
                "address_restaurant",
                "phone_number",
              ],
            },
          ],
        },
        {
          model: HotelBooking,
          include: [
            {
              model: Hotel,
              attributes: ["id", "name_hotel", "address_hotel", "phone_number"],
            },
          ],
        },
        {
          model: VehicleBooking,
          include: [
            {
              model: Vehicle,
              attributes: ["id", "name_vehicle", "plate_number"],
            },
          ],
        },
      ],
    });

    res.status(200).json({
      message: "Tất cả booking đã được lấy thành công!",
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching bookings",
      error: error.message,
    });
  }
};

//Lấy chi tiết một booking theo ID
exports.getBookingById = async (req, res) => {
  try {
    const bookingId = req.params.id;

    const booking = await Booking.findByPk(bookingId, {
      include: [
        { model: User, attributes: ["id", "email", "avatar"] },
        {
          model: TravelTour,
          attributes: ["id", "tour_id", "start_time", "end_time", "price_tour"],
        },
        {
          model: RestaurantBooking,
          include: [
            {
              model: Restaurant,
              attributes: [
                "id",
                "name_restaurant",
                "address_restaurant",
                "phone_number",
              ],
            },
          ],
        },
        {
          model: HotelBooking,
          include: [
            {
              model: Hotel,
              attributes: ["id", "name_hotel", "address_hotel", "phone_number"],
            },
          ],
        },
        {
          model: VehicleBooking,
          include: [
            {
              model: Vehicle,
              attributes: ["id", "name_vehicle", "plate_number"],
            },
          ],
        },
      ],
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found!" });
    }

    res.status(200).json({
      message: "Tất cả booking đã được lấy thành công!",
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching booking",
      error: error.message,
    });
  }
};

//Tạo mới một booking
exports.createBooking = async (req, res) => {
  try {
    const {
      user_id,
      travel_tour_id,
      number_adult,
      number_children,
      number_newborn,
      number_toddler,
      total_cost,
      name,
      phone,
      email,
      address,
      note,
      voucher_id,
      passengers,
      booking_code,
    } = req.body;
    console.log(req.body);

    // Parse passengers từ chuỗi JSON thành object JavaScript
    const passengersArray = Array.isArray(passengers) ? passengers : [];

    // Kiểm tra các trường bắt buộc
    if (!user_id || !travel_tour_id || !name || !phone || !email) {
      return res.status(400).json({
        message: "Vui lòng điền đầy đủ thông tin bắt buộc!",
      });
    }

    // Kiểm tra số lượng người
    if (number_adult < 0 || number_children < 0 || number_newborn < 0) {
      return res.status(400).json({
        message: "Số lượng người không được âm!",
      });
    }

    if (number_adult === 0 && number_children === 0 && number_newborn === 0) {
      return res.status(400).json({
        message: "Phải có ít nhất một người trong booking!",
      });
    }

    if (passengers && passengers.length > 0) {
      for (let i = 0; i < passengers.length; i++) {}
    }
    // Kiểm tra tổng chi phí
    if (!total_cost || total_cost <= 0) {
      return res.status(400).json({
        message: "Tổng chi phí phải lớn hơn 0!",
      });
    }
    if (voucher_id) {
      const voucher = await Voucher.findByPk(voucher_id);
      if (!voucher) {
        return res.status(400).json({
          message: "Mã voucher không tồn tại!",
        });
      }
      if (voucher.status === 0 || voucher.quantity <= 0) {
        return res.status(400).json({
          message: "Mã voucher đã hết hạn!",
        });
      }

      voucher.quantity -= 1;
      await voucher.save();
    }
    // Kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Email không hợp lệ!",
      });
    }

    // Kiểm tra định dạng số điện thoại
    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        message: "Số điện thoại không hợp lệ!",
      });
    }

    // Kiểm tra tour có tồn tại không
    const travelTour = await TravelTour.findByPk(travel_tour_id);
    if (!travelTour) {
      return res.status(404).json({
        message: "Tour không tồn tại!",
      });
    }

    // Kiểm tra người dùng có tồn tại không
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({
        message: "Người dùng không tồn tại!",
      });
    }

    const tour = await Tour.findByPk(travelTour.tour_id);

    // Tạo booking mới
    const newBooking = await Booking.create({
      user_id,
      travel_tour_id,
      number_adult,
      number_children,
      number_toddler,
      number_newborn,
      total_cost,
      booking_date: new Date(),
      name,
      phone,
      email,
      address,
      status: 0,
      note,
      voucher_id,
    });
    travelTour.current_people += number_adult + number_children + number_toddler;
    await travelTour.save();

    //Gửi email xác nhận
    sendConfirmationEmail(email, {
      name,
      email,
      name_tour: tour.name_tour,
      travelTour,
      total_cost,
      start_time: travelTour.start_time,
      end_time: travelTour.end_time,
    });

    // Xử lý danh sách passenger nếu có
    if (passengersArray && passengersArray.length > 0) {
      // Kiểm tra số lượng passenger có khớp với số lượng người đã đăng ký không
      const totalPassengers =
        parseInt(number_adult) +
        parseInt(number_children) +
        parseInt(number_toddler) +
        parseInt(number_newborn);
      if (passengersArray.length !== totalPassengers) {
        return res.status(400).json({
          message:
            "Số lượng thông tin hành khách không khớp với số lượng người đã đăng ký!",
        });
      }

      // Tạo danh sách passenger
      const passengerPromises = passengersArray.map((passenger) => {
        return Passenger.create({
          name: passenger.name,
          birth_date: passenger.birth_date,
          gender: passenger.gender,
          phone_number: passenger.phone_number,
          booking_id: newBooking.id,
          passport_number: passenger.passport_number,
        });
      });

      await Promise.all(passengerPromises);
    }

    res.status(201).json({
      message: "Đặt tour thành công!",
      data: newBooking,
      passengers: passengersArray,
    });
  } catch (error) {
    console.error("Lỗi khi tạo booking:", error);
    res.status(500).json({
      message: "Lỗi khi đặt tour!",
      error: error.message,
    });
  }
};

// Cập nhật thông tin booking
exports.updateBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const { number_adult, number_children, total_cost, status } = req.body;

    const booking = await Booking.findByPk(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found!" });
    }

    if (number_adult != undefined)
      booking.number_adult = number_adult || booking.number_adult;
    if (number_children != undefined)
      booking.number_children = number_children || booking.number_children;
    if (total_cost != undefined)
      booking.total_cost = total_cost || booking.total_cost;
    if (status != undefined) booking.status = status || booking.status;

    await booking.save();

    res.status(200).json({
      message: "Cập nhật booking thành công!",
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Cập nhật booking thất bại!",
      error: error.message,
    });
  }
};

// Cancel booking
exports.deleteBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;

    const booking = await Booking.findByPk(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Không tìm thấy booking!" });
    }

    await booking.destroy();

    res.status(200).json({
      message: "Đã hủy booking thành công!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi hủy booking!",
      error: error.message,
    });
  }
};

// Lấy booking mới nhất
exports.getLatestBooking = async (req, res) => {
  try {
    const latestBooking = await Booking.findOne({
      order: [["id", "DESC"]], // Sắp xếp giảm dần theo ID (mới nhất trước)
      include: [
        { model: User, attributes: ["id", "email", "avatar"] },
        {
          model: TravelTour,
          attributes: ["id", "tour_id", "start_time", "end_time", "price_tour"],
        },
        {
          model: RestaurantBooking,
          include: [
            {
              model: Restaurant,
              attributes: [
                "id",
                "name_restaurant",
                "address_restaurant",
                "phone_number",
              ],
            },
          ],
        },
        {
          model: HotelBooking,
          include: [
            {
              model: Hotel,
              attributes: ["id", "name_hotel", "address_hotel", "phone_number"],
            },
          ],
        },
        {
          model: VehicleBooking,
          include: [
            {
              model: Vehicle,
              attributes: ["id", "name_vehicle", "plate_number"],
            },
          ],
        },
      ],
    });

    if (!latestBooking) {
      return res.status(404).json({ message: "Không tìm thấy booking nào!" });
    }

    res.status(200).json({
      message: "Lấy booking mới nhất thành công!",
      data: latestBooking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy booking mới nhất!",
      error: error.message,
    });
  }
};
