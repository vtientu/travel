const {Sequelize, DataTypes} = require("sequelize");
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
const Service = require("./service.model")(sequelize, Sequelize);
const TourService = require("./tour_service.model")(sequelize, Sequelize);

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

module.exports = db;
