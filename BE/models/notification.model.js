module.exports = (sequelize, Sequelize) => {
  const Notification = sequelize.define(
    "Notification",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      booking_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "notification_type",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      send_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "notification",
      timestamps: false, // Không có `createdAt` và `updatedAt`
    }
  );

  return Notification;
};
