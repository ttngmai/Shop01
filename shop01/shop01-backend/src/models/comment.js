const Sequelize = require('sequelize');

module.exports = class Image extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        text: {
          type: Sequelize.STRING(300),
          allowNull: false,
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
        modelName: 'Comment',
        tableName: 'comments',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }

  static associate(db) {
    db.Comment.belongsTo(db.Product, {
      foreignKey: 'product_id',
      targetKey: 'id',
    });
    db.Comment.belongsTo(db.User, { foreignKey: 'user_id', targetKey: 'id' });
    db.Comment.hasMany(db.CommentImage, {
      foreignKey: 'comment_id',
      sourceKey: 'id',
    });
    db.Comment.belongsTo(db.Comment, {
      foreignKey: 'parent_comment',
      as: 'ParentComment',
    });
  }
};
