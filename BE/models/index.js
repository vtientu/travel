const { Sequelize } = require("sequelize");
const config = require("../db/config.js");

// Khởi tạo Sequelize với cấu hình từ `config.js`
const sequelize = new Sequelize(config.database, config.user, config.password, {
    host: config.host,
    dialect: "mysql",
    logging: false, // Tắt log query SQL
});

// Kiểm tra kết nối
sequelize
    .authenticate()
    .then(() => console.log("Connected to MySQL successfully"))
    .catch((error) => console.error("Unable to connect to the database:", error));

// Import các model
const Location = require("./location.model")(sequelize, Sequelize);
const Tour = require("./tour.model")(sequelize, Sequelize);
const Service = require("./service.model")(sequelize, Sequelize);
const TourService = require("./tour_service.model")(sequelize, Sequelize);

// Đối tượng `db` để chứa Sequelize và Models
const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Tour = Tour;
db.Location = Location;
db.Service = Service;
db.TourService = TourService;

module.exports = db;
