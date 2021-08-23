const Sequelize = require('sequelize');

module.exports = class ProductCategory extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        depth: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          defaultValue: 1,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: 'ProductCategory',
        tableName: 'product_categories',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  static associate(db) {
    db.ProductCategory.hasMany(db.ProductCategory, {
      onDelete: 'CASCADE',
      foreignKey: 'parent_id',
      as: 'SubCategory',
    });
    db.ProductCategory.hasMany(db.Product, {
      foreignKey: 'category_id',
      sourceKey: 'id',
    });
  }
};
