module.exports = (sequelize, Sequelize) => {
  const DiscountService = sequelize.define(
    "DiscountService",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      travel_tour_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "tour", // Bảng tham chiếu (giả sử bảng tour có tên là 'tour')
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      program_discount_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "program_discount", // Bảng tham chiếu (giả sử bảng giảm giá có tên là 'program_discount')
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    },
    {
      tableName: "discount_service", // Tên bảng trong MySQL
      timestamps: false, // Không dùng createdAt và updatedAt
    }
  );

  return DiscountService;
};
