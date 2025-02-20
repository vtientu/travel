const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Feedback = sequelize.define(
        "Feedback",
        {
            feedback_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: "user", // Giả sử bảng user có tên là 'user'
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "SET NULL",
            },
            tour_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: "tour", // Giả sử bảng tour có tên là 'tour'
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "SET NULL",
            },
            description_feedback: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            rating: {
                type: DataTypes.INTEGER,
                allowNull: true,
                validate: {
                    min: 1,
                    max: 5, // Giả sử rating chỉ từ 1 đến 5
                },
            },
            feedback_date: {
                type: DataTypes.DATEONLY,
                allowNull: true,
            },
        },
        {
            tableName: "feedback",
            timestamps: false, // Không có `createdAt` và `updatedAt`
        }
    );

    return Feedback;
};
