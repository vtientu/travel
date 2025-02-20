module.exports = (sequelize, Sequelize) => {
  const GuideTour = sequelize.define(
    "GuideTour",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      travel_guide_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "travel_guide", // Giả sử bảng hướng dẫn viên có tên là 'travel_guide'
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      travel_tour_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "travel_tour", // Giả sử bảng tour du lịch có tên là 'travel_tour'
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "user", // Giả sử bảng user có tên là 'user'
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
    },
    {
      tableName: "guide_tour",
      timestamps: false, // Không có `createdAt` và `updatedAt`
    }
  );

  return GuideTour;
};
