module.exports = (sequelize, Sequelize) => {
    const Restaurant = sequelize.define(
        "Restaurant",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            menu: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            address: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            phone: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        },
        {
            tableName: "restaurant",
            timestamps: false,
        }
    );

    return Restaurant;
};
