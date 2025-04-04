module.exports = (sequelize, Sequelize) => {
    const TravelTour = sequelize.define(
        "TravelTour",
        {
            id: {
                type: Sequelize.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            tour_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            start_time: {
                type: Sequelize.DATEONLY,
                allowNull: true,
            },
            end_time: {
                type: Sequelize.DATEONLY,
                allowNull: true,
            },
            price_tour: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            max_people: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            current_people: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            status: {
                type: Sequelize.INTEGER, // 0: Chưa có người nhận, 1: Đã có người nhận, 2: Đã hoàn thành, 3: Đã hủy
                allowNull: true,
            },
            active: {
                type: Sequelize.BOOLEAN,
                allowNull: true,
            }
        },
        {
            tableName: "travel_tour", // Tên bảng trong MySQL
            timestamps: true, // Tắt `createdAt` và `updatedAt`
        }
    );
    return TravelTour;
};
