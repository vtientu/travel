module.exports = (sequelize, Sequelize) => {
  const TravelTour = sequelize.define(
    "TravelTour",
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
      start_time: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      end_time: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      price_tour: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      max_people: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "travel_tour", // Tên bảng trong MySQL
      timestamps: false, // Tắt `createdAt` và `updatedAt`
    }
  );
  return TravelTour;
};
