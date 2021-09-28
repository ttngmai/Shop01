const Sequelize = require('sequelize');

module.exports = class Review extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        star_rating: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
        },
        text: {
          type: Sequelize.STRING(1000),
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: 'Review',
        tableName: 'reviews',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }

  static associate(db) {
    db.Review.belongsTo(db.Product, {
      foreignKey: 'product_id',
      targetKey: 'id',
    });
    db.Review.belongsTo(db.User, { foreignKey: 'user_id', targetKey: 'id' });
    db.Review.hasMany(db.ReviewImage, {
      foreignKey: 'review_id',
      sourceKey: 'id',
    });
  }
};
