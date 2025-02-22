module.exports = (sequelize, Sequelize) => {
  const DiscountService = sequelize.define(
    "DiscountService",
    {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      travel_tour_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      program_discount_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "discount_service", // Tên bảng trong MySQL
      timestamps: false, // Không dùng createdAt và updatedAt
    }
  );

  return DiscountService;
};
