module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "User",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "user",
      timestamps: false,
    }
  );
};
