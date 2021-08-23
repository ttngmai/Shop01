const Sequelize = require('sequelize');

module.exports = class ProductImage extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        order: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: 'ProductImage',
        tableName: 'product_images',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  static associate(db) {
    db.ProductImage.belongsTo(db.Product, {
      foreignKey: 'product_id',
      targetKey: 'id',
    });
  }
};
