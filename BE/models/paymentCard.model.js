module.exports = (sequelize, Sequelize) => {
  const PaymentCard = sequelize.define(
    "PaymentCard",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      customer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "customer",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      card_number: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      card_holder_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      expiry_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      card_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      is_default: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: "payment_card",
      timestamps: false,
    }
  );

  return PaymentCard;
};
