const Joi = require('joi');
const { sequelize } = require('../../models');
const { Op } = require('sequelize');
const Product = require('../../models/product');
const ProductCategory = require('../../models/productCategory');
const ProductImage = require('../../models/productImage');
const Review = require('../../models/review');

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

  console.log(req.files);

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
  const { category, name } = req.query;
  const page = parseInt(req.query.page || '1', 10);

  if (page < 1) {
    res.status(400).end();
    return;
  }

  console.log('----- category -----')
  console.log(category);

  const whereClause = {
    ...(category ? { category_id: category } : {}),
    ...(name ? { name: { [Op.like]: `%${name}%` } } : {}),
  };

  console.log(req.query);
  console.log(whereClause);

  try {
    const productsPerPage = 12;
    const products = await Product.findAll({
      where: whereClause,
      include: [
        {
          model: ProductCategory,
        },
        {
          model: ProductImage,
        },
      ],
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
      include: [
        {
          model: ProductCategory,
        },
        {
          model: ProductImage,
        },
      ],
    });

    if (!product) {
      res.status(404).end();
      return;
    }

    const reviews = await Review.findAll({
      where: { product_id: id },
      attributes: [
        [sequelize.fn('COUNT', sequelize.col('id')), 'reviews_total_count'],
        [
          sequelize.fn(
            'TRUNCATE',
            sequelize.fn('AVG', sequelize.col('star_rating')),
            1,
          ),
          'star_rating_average',
        ],
      ],
    });

    if (reviews.length > 0) {
      product.dataValues.reviews_total_count =
        reviews[0].dataValues.reviews_total_count;
      product.dataValues.star_rating_average =
        reviews[0].dataValues.star_rating_average;
    }

    res.json(product);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.update = async (req, res, next) => {
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

  const { id } = req.params;
  const { category, name, price } = req.body;

  try {
    const product = await Product.update(
      {
        category_id: category,
        name,
        price,
      },
      {
        where: { id },
      },
    );

    if (!product[0]) {
      res.status(404).end();
      return;
    }

    const data = {
      number: product[0],
    };

    res.json(data);
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
