const { Sequelize, DataTypes } = require("sequelize");
const config = require("../db/config.js");

// Khởi tạo Sequelize với cấu hình từ `config.js`
const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: "mysql",
  dialectModule: require("mysql2"),
  logging: false, // Tắt log query SQL
});

// Kiểm tra kết nối
sequelize
  .authenticate()
  .then(() => console.log("Connected to MySQL successfully"))
  .catch((error) => console.error("Unable to connect to the database:", error));

// Import các model
const Tour = require("./tour.model")(sequelize, Sequelize);
const TravelTour = require("./tour.model")(sequelize, Sequelize);
const User = require("./user.model")(sequelize, Sequelize);
const Customer = require("./customer.model")(sequelize);
const Booking = require("./booking.model")(sequelize);
const DiscountService = require("./discountService.model.js")(sequelize);
const Feedback = require("./feedback.model")(sequelize);
const GuideTour = require("./guideTour.model.js")(sequelize);
const Location = require("./location.model.js")(sequelize);
const Notification = require("./notification.model.js")(sequelize);
const NotificationType = require("./notificationType.model.js")(sequelize);
const User = require("./user.model")(sequelize, Sequelize);
const Customer = require("./customer.model")(sequelize, Sequelize);
const Booking = require("./booking.model")(sequelize, Sequelize);
const DiscountService = require("./discountService.model.js")(
  sequelize,
  Sequelize
);
const Feedback = require("./feedback.model")(sequelize, Sequelize);
const GuideTour = require("./guideTour.model.js")(sequelize, Sequelize);
const Location = require("./location.model.js")(sequelize, Sequelize);
const Notification = require("./notification.model.js")(sequelize, Sequelize);
const NotificationType = require("./notificationType.model.js")(
  sequelize,
  Sequelize
);
const Service = require("./service.model")(sequelize, Sequelize);
const TourService = require("./tour_service.model")(sequelize, Sequelize);
const ProgramDiscount = require("./programDiscount.model.js")(
  sequelize,
  Sequelize
);
const Role = require("./role.model.js")(sequelize, Sequelize);
const RoleService = require("./roleService.model.js")(sequelize, Sequelize);
// const TravelGuide = require("./travelGuide.model.js")(sequelize, Sequelize);
// const TravelTour = require("./travelTour.model.js")(sequelize, Sequelize);
// const Restaurant = require("./restaurant.model.js")(sequelize, Sequelize);
// const RestaurantBooking = require("./restaurantBooking.model.js")(
//   sequelize,
//   Sequelize
// );
const Hotel = require("./hotel.model.js")(sequelize, Sequelize);
// const HotelBooking = require("./hotelBooking.model.js")(sequelize, Sequelize);
// const PaymentCard = require("./paymentCard.model.js")(sequelize, Sequelize);
const Vehicle = require("./vehicle.model.js")(sequelize, Sequelize);
// const VehicleBooking = require("./vehicleBooking.model.js")(
//   sequelize,
//   Sequelize
// );

// Đối tượng `db` để chứa Sequelize và Models
const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Tour = Tour;
db.TravelTour = TravelTour;
db.User = User;
db.Customer = Customer;
db.Booking = Booking;
db.DiscountService = DiscountService;
db.Feedback = Feedback;
db.GuideTour = GuideTour;
db.Location = Location;
db.Notification = Notification;
db.NotificationType = NotificationType;
db.Service = Service;
db.TourService = TourService;
db.Role = Role;
db.RoleService = RoleService;
db.ProgramDiscount = ProgramDiscount;
// db.TravelGuide = TravelGuide;
// db.TravelTour = TravelTour;
// db.Restaurant = Restaurant;
// db.RestaurantBooking = RestaurantBooking;
db.Hotel = Hotel;
// db.HotelBooking = HotelBooking;
// db.PaymentCard = PaymentCard;
db.Vehicle = Vehicle;
// db.VehicleBooking = VehicleBooking;

module.exports = db;
