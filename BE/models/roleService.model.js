module.exports = (sequelize, Sequelize) => {
  const RoleService = sequelize.define(
    "RoleService",
    {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      role_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "role_service",
      timestamps: false,
    }
  );

  return RoleService;
};
