const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const NotificationType = sequelize.define(
        "NotificationType",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            type_name: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            description_notification_type: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
        },
        {
            tableName: "notification_type",
            timestamps: false, // Không có `createdAt` và `updatedAt`
        }
    );

    return NotificationType;
};
