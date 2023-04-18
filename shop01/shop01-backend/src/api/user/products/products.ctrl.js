const Joi = require('joi');
const { sequelize } = require('../../../models');
const { Op } = require('sequelize');
const Product = require('../../../models/product');
const ProductCategory = require('../../../models/productCategory');
const ProductImage = require('../../../models/productImage');
const Review = require('../../../models/review');

exports.list = async (req, res, next) => {
  let { category, name } = req.query;

  if (Array.isArray(name)) {
    name = name[0];
  }

  const page = parseInt(req.query.page || '1', 10);

  if (page < 1) {
    res.status(400).end();
    return;
  }

  if (category) {
    category = await ProductCategory.getSubCategoryIds(parseInt(category));
  }

  const whereClause = {
    display: true,
    ...(category ? { category_id: category } : {}),
    ...(name ? { name: { [Op.like]: `%${name}%` } } : {}),
  };

  try {
    const productsPerPage = 12;
    const products = await Product.findAll({
      where: whereClause,
      attributes: {
        include: [
          [
            sequelize.fn('COUNT', sequelize.col('Reviews.id')),
            'reviews_total_count',
          ],
          [
            sequelize.fn(
              'TRUNCATE',
              sequelize.fn('AVG', sequelize.col('star_rating')),
              1,
            ),
            'star_rating_average',
          ],
        ],
      },
      include: [
        {
          model: ProductCategory,
        },
        {
          model: ProductImage,
          separate: true,
        },
        {
          model: Review,
          attributes: [],
          duplicating: false,
        },
      ],
      group: ['Product.id'],
      order: [['id', 'DESC']],
      limit: productsPerPage,
      offset: (page - 1) * productsPerPage,
    });

    const { count: productsTotalCount } = await Product.findAndCountAll({
      where: whereClause,
    });

    res
      .set(
        'Products-Total-Page',
        Math.ceil(productsTotalCount / productsPerPage),
      )
      .json(products);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.read = async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await Product.findOne({
      where: { id },
      attributes: {
        include: [
          [
            sequelize.fn('COUNT', sequelize.col('Reviews.id')),
            'reviews_total_count',
          ],
          [
            sequelize.fn(
              'TRUNCATE',
              sequelize.fn('AVG', sequelize.col('star_rating')),
              1,
            ),
            'star_rating_average',
          ],
        ],
      },
      include: [
        {
          model: ProductCategory,
        },
        {
          model: ProductImage,
          separate: true,
        },
        {
          model: Review,
          attributes: [],
        },
      ],
      group: ['Product.id'],
    });

    if (!product) {
      res.status(404).end();
      return;
    }

    res.json(product);
  } catch (err) {
    console.log(err);
    next(err);
  }
};