module.exports = (sequelize, Sequelize) => {
  const HotelBooking = sequelize.define(
    "HotelBooking",
    {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      booking_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      hotel_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "hotel_booking",
      timestamps: false,
    }
  );
  return HotelBooking;
};
