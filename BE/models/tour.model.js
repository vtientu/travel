module.exports = (sequelize, Sequelize) => {
    const Tour = sequelize.define(
        "Tour",
        {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            location_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            name_tour: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            price_tour: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            day_number: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            type_tour_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            rating_tour: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            max_people: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            activity_description: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
        },
        {
            tableName: "tour", // Tên bảng trong MySQL
            timestamps: false, // Tắt `createdAt` và `updatedAt`
        }
    );

    return Tour;
};
