const Sequelize = require('sequelize');

module.exports = class OrderStatus extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: 'OrderStatus',
        tableName: 'order_statuses',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  static associate(db) {
    db.OrderStatus.hasMany(db.Order, {
      foreignkey: 'order_status_id',
      sourceKey: 'id',
    });
  }
};
