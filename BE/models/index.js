const { Sequelize } = require("sequelize");
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
const User = require("./user.model")(sequelize, Sequelize);

const Booking = require("./booking.model")(sequelize, Sequelize);
//Restaurant
const Restaurant = require("./restaurant.model.js")(sequelize, Sequelize);
const RestaurantBooking = require("./restaurantBooking.model.js")(
  sequelize,
  Sequelize
);
//Hotel
const Hotel = require("./hotel.model.js")(sequelize, Sequelize);
const HotelBooking = require("./hotelBooking.model.js")(sequelize, Sequelize);
//Vehicle
const Vehicle = require("./vehicle.model.js")(sequelize, Sequelize);
const VehicleBooking = require("./vehicleBooking.model.js")(
  sequelize,
  Sequelize
);
//Customer
const Customer = require("./customer.model")(sequelize, Sequelize);
const PostExperience = require("./postExperience.model.js")(
  sequelize,
  Sequelize
);
const PaymentCard = require("./paymentCard.model.js")(sequelize, Sequelize);
//Notification
const Notification = require("./notification.model.js")(sequelize, Sequelize);
const NotificationType = require("./notificationType.model.js")(
  sequelize,
  Sequelize
);
//Role
const Role = require("./role.model.js")(sequelize, Sequelize);
const RoleService = require("./roleService.model.js")(sequelize, Sequelize);
//Tour
const Tour = require("./tour.model")(sequelize, Sequelize);
const TravelTour = require("./travel_tour.model")(sequelize, Sequelize);
const Feedback = require("./feedback.model")(sequelize, Sequelize);
const GuideTour = require("./guideTour.model.js")(sequelize, Sequelize);
const TravelGuide = require("./travelGuide.model.js")(sequelize, Sequelize);
const Location = require("./location.model.js")(sequelize, Sequelize);
const Service = require("./service.model")(sequelize, Sequelize);
const DiscountService = require("./discountService.model.js")(
  sequelize,
  Sequelize
);
const ProgramDiscount = require("./programDiscount.model.js")(
  sequelize,
  Sequelize
);

// Mối quan hệ (Associations)
// User/Booking
User.hasMany(Booking, { foreignKey: "user_id" });
Booking.belongsTo(User, { foreignKey: "user_id" });

//Booking/RestaurantBooking
Booking.hasMany(RestaurantBooking, { foreignKey: "booking_id" });
RestaurantBooking.belongsTo(Booking, { foreignKey: "booking_id" });

//Restaurant/RestaurantBooking
Restaurant.hasMany(RestaurantBooking, { foreignKey: "restaurant_id" });
RestaurantBooking.belongsTo(Restaurant, { foreignKey: "restaurant_id" });

//Booking/HotelBooking
Booking.hasMany(HotelBooking, { foreignKey: "booking_id" });
HotelBooking.belongsTo(Booking, { foreignKey: "booking_id" });

//Hotel/HotelBooking
Hotel.hasMany(HotelBooking, { foreignKey: "hotel_id" });
HotelBooking.belongsTo(Hotel, { foreignKey: "hotel_id" });

//Booking/VehicleBooking
Booking.hasMany(VehicleBooking, { foreignKey: "booking_id" });
VehicleBooking.belongsTo(Booking, { foreignKey: "booking_id" });

//Vehicle/VehicleBooking
Vehicle.hasMany(VehicleBooking, { foreignKey: "vehicle_id" });
VehicleBooking.belongsTo(Vehicle, { foreignKey: "vehicle_id" });

//User/Customer
User.hasOne(Customer, { foreignKey: "user_id" });
Customer.belongsTo(User, { foreignKey: "user_id" });

//Customer/PaymentCard
Customer.hasMany(PaymentCard, { foreignKey: "customer_id" });
PaymentCard.belongsTo(Customer, { foreignKey: "customer_id" });

//User/Notification
User.hasMany(Notification, { foreignKey: "user_id" });
Notification.belongsTo(User, { foreignKey: "user_id" });

//NotificationType/Notification
NotificationType.hasMany(Notification, { foreignKey: "type_id" });
Notification.belongsTo(NotificationType, { foreignKey: "type_id", as: "type" });

//Booking/Notification
Booking.hasMany(Notification, { foreignKey: "booking_id" });
Notification.belongsTo(Booking, { foreignKey: "booking_id" });

//User/Feedback
User.hasMany(Feedback, { foreignKey: "user_id" });
Feedback.belongsTo(User, { foreignKey: "user_id" });

//Tour/Feedback
Tour.hasMany(Feedback, { foreignKey: "tour_id" });
Feedback.belongsTo(Tour, { foreignKey: "tour_id", as: "tour" });

//Tour/TravelTour
Tour.hasMany(TravelTour, { foreignKey: "tour_id" });
TravelTour.belongsTo(Tour, { foreignKey: "tour_id" });

//Location/Tour
Location.hasMany(Tour, { foreignKey: "location_id" });
Tour.belongsTo(Location, { foreignKey: "location_id" });

//ProgramDiscount/DiscountService
ProgramDiscount.hasMany(DiscountService, { foreignKey: "program_discount_id" });
DiscountService.belongsTo(ProgramDiscount, {
  foreignKey: "program_discount_id",
  as: "programDiscount",
});

//TravelTour/DiscountService
TravelTour.hasMany(DiscountService, { foreignKey: "travel_tour_id" });
DiscountService.belongsTo(TravelTour, {
  foreignKey: "travel_tour_id",
  as: "travelTour",
});

//TravelGuide/GuideTour
TravelGuide.hasMany(GuideTour, { foreignKey: "travel_guide_id" });
GuideTour.belongsTo(TravelGuide, {
  foreignKey: "travel_guide_id",
  as: "travelGuide",
});

//TravelTour/GuideTour
TravelTour.hasMany(GuideTour, { foreignKey: "travel_tour_id" });
GuideTour.belongsTo(TravelTour, {
  foreignKey: "travel_tour_id",
  as: "travelTour",
});

//User/TravelGuide
User.hasOne(TravelGuide, { foreignKey: "user_id" });
TravelGuide.belongsTo(User, { foreignKey: "user_id" });

//User/RoleService
User.hasMany(RoleService, { foreignKey: "user_id" });
RoleService.belongsTo(User, { foreignKey: "user_id" });

//Role/RoleService
Role.hasMany(RoleService, { foreignKey: "role_id" });
RoleService.belongsTo(Role, { foreignKey: "role_id" });

//Customer/PostExperience
Customer.hasMany(PostExperience, { foreignKey: "customer_id" });
PostExperience.belongsTo(Customer, {
  foreignKey: "customer_id",
  as: "customer",
});

//Booking/Notification
Booking.hasMany(Notification, { foreignKey: "booking_id" });
Notification.belongsTo(Booking, { foreignKey: "booking_id" });

//TravelTour/Booking
TravelTour.hasMany(Booking, { foreignKey: "travel_tour_id" });
Booking.belongsTo(TravelTour, { foreignKey: "travel_tour_id" });

// Đối tượng `db` để chứa Sequelize và Models
const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = User;

db.Booking = Booking;

db.Restaurant = Restaurant;
db.RestaurantBooking = RestaurantBooking;

db.Hotel = Hotel;
db.HotelBooking = HotelBooking;

db.Vehicle = Vehicle;
db.VehicleBooking = VehicleBooking;

db.Customer = Customer;
db.PostExperience = PostExperience;
db.PaymentCard = PaymentCard;

db.Notification = Notification;
db.NotificationType = NotificationType;

db.Role = Role;
db.RoleService = RoleService;

db.Tour = Tour;
db.TravelTour = TravelTour;
db.Feedback = Feedback;
db.GuideTour = GuideTour;
db.TravelGuide = TravelGuide;
db.Location = Location;
db.Service = Service;
db.DiscountService = DiscountService;
db.ProgramDiscount = ProgramDiscount;

module.exports = db;
