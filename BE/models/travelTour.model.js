module.exports = (sequelize, Sequelize) => {
  const TravelTour = sequelize.define(
    "TravelTour",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      tour_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "tour",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      start_time: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      end_time: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      price_tour: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      max_people: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "travel_tour",
      timestamps: false,
    }
  );

  return TravelTour;
};
