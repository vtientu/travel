module.exports = (sequelize, Sequelize) => {
  const ProgramDiscount = sequelize.define(
    "ProgramDiscount",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      discount_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      discount_value: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      percent_discount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "program_discount",
      timestamps: false,
    }
  );

  return ProgramDiscount;
};
