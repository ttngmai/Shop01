const Sequelize = require('sequelize');

module.exports = class CommentImage extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: 'CommentImage',
        tableName: 'comment_images',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  static associate(db) {
    db.CommentImage.belongsTo(db.Comment, {
      foreignKey: 'comment_id',
      targetKey: 'id',
    });
  }
};
