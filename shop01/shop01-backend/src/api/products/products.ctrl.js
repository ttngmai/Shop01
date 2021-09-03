const Joi = require('joi');
const { Op } = require('sequelize');
const Product = require('../../models/product');
const ProductCategory = require('../../models/productCategory');
const ProductImage = require('../../models/productImage');

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
  const page = parseInt(req.query.page || '1', 10);

  if (page < 1) {
    res.status(400).end();
    return;
  }

  const { category, name } = req.query;
  const whereClause = {
    ...(category ? { category_id: category } : {}),
    ...(name ? { name: { [Op.like]: `%${name}%` } } : {}),
  };

  console.log(req.query);
  console.log(whereClause);

  try {
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
      limit: 12,
      offset: (page - 1) * 12,
    });

    const productsCount = await Product.count(); // 조건에 따라 표시해야 되므로 findAndCountAll() 사용해 볼 것!
    res.set('Last-Page', Math.ceil(productsCount / 12)).json(products);
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
