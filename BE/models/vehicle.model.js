module.exports = (sequelize, Sequelize) => {
  const Vehicle = sequelize.define(
    "Vehicle",
    {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      name_vehicle: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      plate_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "vehicle",
      timestamps: false,
    }
  );

  return Vehicle;
};
