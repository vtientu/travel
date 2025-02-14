const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Location = sequelize.define(
        "Location",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name_location: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            start_point: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            end_point: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            description_location: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
        },
        {
            tableName: "location",
            timestamps: false, // Không có `createdAt` và `updatedAt`
        }
    );

    return Location;
};
