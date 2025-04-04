module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
        "GuideTour",
        {
            id: {
                type: Sequelize.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            travel_guide_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            travel_tour_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
        },
        {
            tableName: "guide_tour",
            timestamps: true, // Không có `createdAt` và `updatedAt`
        }
    );
};
