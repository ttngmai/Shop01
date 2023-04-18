const Sequelize = require('sequelize');

module.exports = class ProductCategory extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        depth: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          defaultValue: 0,
          validate: {
            max: 2,
          },
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: 'ProductCategory',
        tableName: 'product_categories',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  static associate(db) {
    db.ProductCategory.hasMany(db.ProductCategory, {
      onDelete: 'CASCADE',
      foreignKey: 'parent_id',
      as: 'SubCategory',
    });
    db.ProductCategory.hasMany(db.Product, {
      foreignKey: 'category_id',
      sourceKey: 'id',
    });
  }

  static async getSubCategoryIds(id) {
    let result = [id];
    let categoryIds = await ProductCategory.findAll({
      where: {
        parent_id: id,
      },
      attributes: ['id'],
      raw: true,
    });

    if (categoryIds.length > 0) {
      const promises = [];

      categoryIds.forEach((item) => {
        promises.push(ProductCategory.getSubCategoryIds(item.id));
      });

      let subCategoryIds = await Promise.all(promises);
      subCategoryIds.forEach((id) => {
        result = [...result, ...id];
      });
    }

    return result;
  }
};
