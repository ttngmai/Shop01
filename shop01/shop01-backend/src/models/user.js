const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        email: {
          type: Sequelize.STRING(40),
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        nick: {
          type: Sequelize.STRING(15),
          allowNull: false,
          unique: true,
        },
        phone: {
          type: Sequelize.STRING(11),
          allowNull: true,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
        role_id: {
          type: Sequelize.INTEGER,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: 'User',
        tableName: 'users',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  static associate(db) {
    db.User.belongsTo(db.Role, { foreignkey: 'role_id', targetKey: 'id' });
    db.User.hasMany(db.ShippingAddress, {
      foreignKey: 'user_id',
      sourceKey: 'id',
    });
    db.User.hasOne(db.Cart, { foreignKey: 'user_id', sourceKey: 'id' });
    db.User.hasMany(db.Order, { foreignKey: 'user_id', sourceKey: 'id' });
    db.User.hasMany(db.Review, { foreignKey: 'user_id', sourceKey: 'id' });
  }

  static findByEmail(email) {
    return this.findOne({ where: { email } });
  }

  async setPassword(password) {
    const hash = await bcrypt.hash(password, 12);
    this.password = hash;
  }

  async checkPassword(password) {
    const result = await bcrypt.compare(password, this.password);
    return result;
  }

  serialize() {
    const data = this.toJSON();
    delete data.password;
    delete data.phone;
    delete data.addresss;
    return data;
  }

  generateToken() {
    const token = jwt.sign(
      {
        id: this.id,
        email: this.email,
        nick: this.nick,
        role_id: this.role_id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '7d',
      },
    );
    return token;
  }
};
