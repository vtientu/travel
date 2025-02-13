const { Sequelize } = require("sequelize");
const config = require("./config");

const sequelize = new Sequelize(config.database, config.user, config.password, {
    host: config.host,
    dialect: "mysql",
    logging: false,
});

module.exports = sequelize;
