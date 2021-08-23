const { Op } = require('sequelize');
const ProductCategory = require('../../models/productCategory');
const convertToTrees = require('../../lib/convertToTrees');

exports.create = async (req, res, next) => {
  const { id, name } = req.body;

  try {
    if (id) {
      const parentCategory = await ProductCategory.findOne({
        where: { id },
      });
      const subCategory = await ProductCategory.create({
        name,
        depth: parentCategory.dataValues.depth + 1,
      });

      await parentCategory.addSubCategory(subCategory);

      res.json(subCategory);
    } else {
      const category = await ProductCategory.create({
        name,
        depth: 1,
      });

      res.json(category);
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.list = async (req, res, next) => {
  const { name } = req.query;
  const whereClause = {
    ...(name ? { name: { [Op.like]: `%${name}%` } } : {}),
  };

  try {
    const categories = await ProductCategory.findAll({
      where: whereClause,
    });

    const tempCategories = categories.map((category) => category.dataValues);
    const categoryTree = convertToTrees(
      tempCategories,
      'id',
      'parent_id',
      'children',
    );

    res.json(categoryTree);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.update = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const UpdatedCategoryCount = await ProductCategory.update(
      {
        name,
      },
      {
        where: { id },
      },
    );

    if (UpdatedCategoryCount[0] < 1) {
      res.status(404).end();
      return;
    }

    res.json(UpdatedCategoryCount[0]);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  const { id } = req.params;

  try {
    await ProductCategory.destroy({
      where: { id },
    });

    res.status(204).end();
  } catch (err) {
    console.log(err);
    next(err);
  }
};
