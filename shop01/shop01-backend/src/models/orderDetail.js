const Sequelize = require('sequelize');

module.exports = class OrderDetail extends Sequelize.Model {
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
        quantity: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          defaultValue: 1,
        },
        status: {
          type: Sequelize.STRING(20),
          allowNull: false,
          defaultValue: 'PROCESSING',
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: 'OrderDetail',
        tableName: 'order_details',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  static associate(db) {
    db.OrderDetail.belongsTo(db.Order, {
      foreignKey: 'order_id',
      targetKey: 'id',
    });
    // db.OrderDetail.belongsTo(db.Product, { foreignKey: 'product_id', targetKey: 'id' });
  }
};
