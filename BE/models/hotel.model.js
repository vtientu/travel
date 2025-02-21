module.exports = (sequelize, Sequelize) => {
  const Hotel = sequelize.define(
    "Hotel",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "hotel",
      timestamps: false,
    }
  );

  return Hotel;
};
