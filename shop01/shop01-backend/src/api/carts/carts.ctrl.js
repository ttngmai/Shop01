const { sequelize } = require('../../models');
const { Op } = require('sequelize');
const Product = require('../../models/product');
const ProductImage = require('../../models/productImage');
const Cart = require('../../models/cart');

exports.create = async (req, res, next) => {
  const user = req.user;
  const { product } = req.body;

  const item = await Cart.create({
    user_id: user.id,
    product_id: product.id,
    quantity: product.quantity,
  });

  res.json(item);
};

exports.read = async (req, res, next) => {
  const user = req.user;

  if (!user) {
    // 로그인하지 않았을 경우
    console.log('로그인 안됨');
    res.end();
    return;
  }

  try {
    const cart = await Cart.findAll({
      where: { user_id: user.id },
      attributes: [
        [sequelize.literal('`Product`.`id`'), 'id'],
        [sequelize.literal('`Product`.`name`'), 'name'],
        [sequelize.literal('`Product`.`price`'), 'price'],
        'quantity',
        [sequelize.literal('`Product->ProductImages`.`name`'), 'image'],
        [sequelize.literal('`Product`.`create_at`'), 'create_at'],
        [sequelize.literal('`Product`.`category_id`'), 'category_id'],
      ],
      include: [
        {
          model: Product,
          attributes: [],
          include: [
            {
              model: ProductImage,
              where: { order: 1 },
              attributes: [],
            },
          ],
        },
      ],
      order: [[sequelize.literal('`Cart`.`create_at`'), 'DESC']],
    });

    res.json(cart);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  const user = req.user;
  const { id } = req.params;

  if (!user) {
    // 로그인하지 않았을 경우
    console.log('로그인 안됨');
    res.end();
    return;
  }

  try {
    await Cart.destroy({
      where: { user_id: user.id, product_id: id },
    });

    res.status(204).end();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.deleteItems = async (req, res, next) => {
  const user = req.user;
  const ids = req.body;

  if (!user) {
    // 로그인하지 않았을 경우
    console.log('로그인 안됨');
    res.end();
    return;
  }

  try {
    await Cart.destroy({
      where: { user_id: user.id, product_id: { [Op.in]: ids } },
    });

    res.status(204).end();
  } catch (err) {
    console.log(err);
    next(err);
  }
};
