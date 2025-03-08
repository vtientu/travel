module.exports = (sequelize, Sequelize) => {
  const Tour = sequelize.define(
    "Tour",
    {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      code_tour: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      name_tour: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      price_tour: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      day_number: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      rating_tour: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      max_people: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      activity_description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      start_location: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      end_location: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      available_month: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "tour", // Tên bảng trong MySQL
      timestamps: false, // Tắt `createdAt` và `updatedAt`
    }
  );

  return Tour;
};
