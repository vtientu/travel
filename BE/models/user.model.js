module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
        "User",
        {
            id: {
                type: Sequelize.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            role_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 1,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: true,
                indexes: [
                    {
                        unique: true,
                        fields: ["email"] // Đảm bảo không tạo index trùng lặp
                    }
                ],
                validate: {
                    isEmail: true,
                },
            },
            displayName: {
                type: Sequelize.STRING,
                allowNull: true
            },
            password: {
                type: Sequelize.STRING,
                allowNull: true, // Google user không cần mật khẩu
            },
            googleId: {
                type: Sequelize.STRING,
                allowNull: true, // Chỉ dùng cho Google login
                indexes: [
                    {
                        unique: true,
                        fields: ["googleId"] // Đảm bảo không tạo nhiều index trùng lặp
                    }
                ]
            },
            avatar: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            status: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
        },
        {
            tableName: "user",
            timestamps: false,
        }
    );
};
