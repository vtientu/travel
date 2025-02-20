module.exports = (sequelize, Sequelize) => {
  const RestaurantBooking = sequelize.define(
    "RestaurantBooking",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      restaurant_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "restaurant",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      booking_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "booking",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      time: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "restaurant_booking",
      timestamps: false,
    }
  );

  return RestaurantBooking;
};
