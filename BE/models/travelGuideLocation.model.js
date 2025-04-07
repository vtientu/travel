module.exports = (sequelize, Sequelize) => {
  const TravelGuideLocation = sequelize.define(
    "TravelGuideLocation",
    {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      travel_guide_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      location_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "travel_guide_location",
      timestamps: false,
    }
  );

  return TravelGuideLocation;
};
