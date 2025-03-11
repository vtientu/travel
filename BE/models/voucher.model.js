module.exports = (sequelize, Sequelize) => {
  const Voucher = sequelize.define(
    "Voucher",
    {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      voucher_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      discount_percentage: {
        type: Sequelize.INTEGER,
      },
      discount_amount: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      start_date: {
        type: Sequelize.DATE,
      },
      end_date: {
        type: Sequelize.DATE,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "voucher", // Tên bảng trong MySQL
      timestamps: false, // Không dùng createdAt và updatedAt
    }
  );

  return Voucher;
};
