module.exports = (sequelize, Sequelize) => {
  const TourService = sequelize.define(
    "TourService",
    {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      tour_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      service_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "tour_service", // Tên bảng trong MySQL
      timestamps: false, // Tắt `createdAt` và `updatedAt`
    }
  );

  return TourService;
};
