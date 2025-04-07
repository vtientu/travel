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
      start_day: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      end_day: {
        type: Sequelize.DATEONLY,
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
      current_people: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      status: {
        type: Sequelize.INTEGER, // 0: Chưa có người nhận, 1: Đã có người nhận, 2: Đã hoàn thành, 3: Đã hủy
        allowNull: true,
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      // Thời gian ngày khởi hành
      start_time_depart: {
        type: Sequelize.TIME,
        allowNull: true,
      },
      end_time_depart: {
        type: Sequelize.TIME,
        allowNull: true,
      },
      // Thời gian ngày kết thúc
      start_time_close: {
        type: Sequelize.TIME,
        allowNull: true,
      },
      end_time_close: {
        type: Sequelize.TIME,
        allowNull: true,
      },
    },
    {
      tableName: "travel_tour", // Tên bảng trong MySQL
      timestamps: true, // Tắt `createdAt` và `updatedAt`
    }
  );
  return TravelTour;
};
