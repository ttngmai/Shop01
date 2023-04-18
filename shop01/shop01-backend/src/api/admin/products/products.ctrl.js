const Joi = require('joi');
const { sequelize } = require('../../../models');
const { Op } = require('sequelize');
const Product = require('../../../models/product');
const ProductCategory = require('../../../models/productCategory');
const ProductImage = require('../../../models/productImage');
const Review = require('../../../models/review');

exports.register = async (req, res, next) => {
  const schema = Joi.object().keys({
    category: Joi.string()
      .pattern(/^[1-9][0-9]*$/)
      .required(),
    name: Joi.string().required(),
    price: Joi.string()
      .pattern(/^[1-9][0-9]*$/)
      .required(),
  });
  const result = schema.validate(req.body);

  if (result.error) {
    res.status(400).send(result.error);
    return;
  }

  const { category, name, price } = req.body;
  const images = req.files;

  try {
    const product = await Product.create({
      category_id: category,
      name,
      price,
    });

    for (let i = 0; i < images.length; i++) {
      let image = null;

      image = await ProductImage.create({
        name: images[i].filename,
        order: i + 1,
      });
      await product.addProductImage(image);
    }

    res.json(product);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

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

exports.update = async (req, res, next) => {
  const schema = Joi.object().keys({
    category: Joi.string()
      .pattern(/^[1-9][0-9]*$/)
      .optional(),
    name: Joi.string().optional(),
    price: Joi.string()
      .pattern(/^[1-9][0-9]*$/)
      .optional(),
  });
  const result = schema.validate(req.body);

  if (result.error) {
    res.status(400).send(result.error);
    return;
  }

  const { id } = req.params;
  const { category, name, price } = req.body;

  const valuesClause = {
    ...(category ? { category_id: category } : {}),
    ...(name ? { name } : {}),
    ...(price ? { price } : {}),
  };

  try {
    const product = await Product.findOne({ where: { id } });

    if (!product) {
      res.status(404).end();
      return;
    }

    await product.update({ where: { id } }, valuesClause);

    res.json(product);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.updateDisplay = async (req, res, next) => {
  const schema = Joi.object().keys({
    display: Joi.boolean().required(),
  });
  const result = schema.validate(req.body);

  if (result.error) {
    res.status(400).send(result.error);
    return;
  }

  const { id } = req.params;
  const { display } = req.body;

  try {
    const product = await Product.findOne({ where: { id } });

    if (!product) {
      res.status(404).end();
      return;
    }

    await product.update({ display });

    res.json(product);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  const { id } = req.params;

  try {
    await Product.destroy({
      where: { id },
    });

    res.status(204).end();
  } catch (err) {
    console.log(err);
    next(err);
  }
};
