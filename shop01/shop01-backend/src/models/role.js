const Sequelize = require('sequelize');

module.exports = class Role extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: Sequelize.STRING(10),
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: 'Role',
        tableName: 'roles',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  static associate(db) {
    db.Role.hasMany(db.User, { foreignkey: 'role_id', sourceKey: 'id' });
  }
};
