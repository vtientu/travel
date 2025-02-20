module.exports = (sequelize, Sequelize) => {
  const Restaurant = sequelize.define(
    "Restaurant",
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
          model: "travel_tour",
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
    },
    {
      tableName: "restaurant",
      timestamps: false,
    }
  );

  return Restaurant;
};
