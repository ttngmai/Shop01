const Sequelize = require('sequelize');

module.exports = class ReviewImage extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: 'ReviewImage',
        tableName: 'review_images',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  static associate(db) {
    db.ReviewImage.belongsTo(db.Review, {
      foreignKey: 'review_id',
      targetKey: 'id',
    });
  }
};
