const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Customer = sequelize.define(
        "Customer",
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
            first_name: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            last_name: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: true,
                validate: {
                    isEmail: true,
                },
            },
            gender: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            birth_date: {
                type: DataTypes.DATEONLY,
                allowNull: true,
            },
            number_phone: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            tableName: "customer",
            timestamps: false, 
        }
    );

    return Customer;
};
