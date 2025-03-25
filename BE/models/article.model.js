module.exports = (sequelize, Sequelize) => {
  const Article = sequelize.define(
    "Article",
    {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      directory_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allow_null: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      alias: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      album_post: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      true_featured: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      true_active: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "article",
      timestamps: false,
    }
  );

  return Article;
};
