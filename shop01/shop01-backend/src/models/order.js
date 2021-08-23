const Sequelize = require('sequelize');

module.exports = class Order extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        status: {
          type: Sequelize.STRING(20),
          allowNull: false,
          defaultValue: 'PROCESSING',
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
        modelName: 'Order',
        tableName: 'orders',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  static associate(db) {
    db.Order.belongsTo(db.User, { foreignKey: 'user_id', targetKey: 'id' });
    db.Order.hasMany(db.OrderDetail, { foreignKey: 'order_id', sourceKey: 'id' });
  }
};
