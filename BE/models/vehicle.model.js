module.exports = (sequelize, Sequelize) => {
  const Vehicle = sequelize.define(
    "Vehicle",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      seats: {
        type: Sequelize.INTEGER,
        allowNull: false, // Trường bắt buộc cho số lượng ghế
      },
      license_plate: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, // Đảm bảo rằng mỗi biển số xe là duy nhất
      },
    },
    {
      tableName: "vehicle",
      timestamps: false,
    }
  );

  return Vehicle;
};
