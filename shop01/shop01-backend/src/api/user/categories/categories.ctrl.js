const { Op } = require('sequelize');
const Joi = require('joi');
const ProductCategory = require('../../../models/productCategory');
const convertToTrees = require('../../../lib/convertToTrees');

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
