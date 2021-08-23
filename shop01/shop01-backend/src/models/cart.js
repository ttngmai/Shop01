const Sequelize = require('sequelize');

module.exports = class Cart extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        count: {
          type: Sequelize.INTEGER.UNSIGNED,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: 'Cart',
        tableName: 'carts',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  static associate(db) {
    db.Cart.belongsTo(db.User, { foreignKey: 'user_id', targetKey: 'id' });
    db.Cart.belongsTo(db.Product, { foreignKey: 'product_id', targetKey: 'id' });
  }
};
