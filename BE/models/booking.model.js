const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Booking = sequelize.define(
        "Booking",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: "user", // Bảng tham chiếu
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "SET NULL",
            },
            tour_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: "tour", // Bảng tham chiếu
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "SET NULL",
            },
            booking_date: {
                type: DataTypes.DATEONLY,
                allowNull: true,
            },
            number_adult: {
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue: 0,
            },
            number_children: {
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue: 0,
            },
            total_cost: {
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue: 0,
            },
            status: {
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue: 0, // 0: Pending, 1: Confirmed, 2: Canceled
            },
        },
        {
            tableName: "booking", // Đảm bảo tên bảng khớp với DB
            timestamps: false, // Không dùng createdAt và updatedAt
        }
    );

    return Booking;
};
