const Sequelize = require('sequelize');

module.exports = class ShippingAddress extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        address1: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        address2: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        isDefault: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        }
      },
      {
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: 'ShippingAddress',
        tableName: 'shipping_addresses',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  static associate(db) {
    db.ShippingAddress.belongsTo(db.User, {
      foreignKey: 'user_id',
      targetkey: 'id',
    });
  }
};
