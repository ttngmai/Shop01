const Sequelize = require('sequelize');

module.exports = class Product extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: Sequelize.STRING(40),
          allowNull: false,
        },
        price: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
        },
        create_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: 'Product',
        tableName: 'products',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  static associate(db) {
    db.Product.belongsTo(db.ProductCategory, {
      foreignKey: 'category_id',
      targetKey: 'id',
    });
    db.Product.hasMany(db.Cart, { foreignKey: 'product_id', sourceKey: 'id' });
    // db.Product.hasMany(db.OrderDetail, {
    //   foreignKey: 'product_id',
    //   sourceKey: 'id',
    // });
    db.Product.hasMany(db.ProductImage, {
      foreignKey: 'product_id',
      sourceKey: 'id',
    });
    db.Product.hasMany(db.Comment, {
      foreignKey: 'product_id',
      sourceKey: 'id',
    });
  }
};
