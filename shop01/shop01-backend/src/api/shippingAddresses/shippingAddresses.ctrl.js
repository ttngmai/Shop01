const Joi = require('joi');
const { sequelize } = require('../../models');
const ShippingAddress = require('../../models/shippingAddress');

exports.register = async (req, res, next) => {
  const user = req.user;
  const { postCode: post_code, address1, address2 } = req.body;

  try {
    const exist = await ShippingAddress.findOne({
      where: { user_id: user.id, post_code, address1, address2 },
    });

    if (exist) {
      res.status(409).end(); // Conflict
      return;
    }

    const defaultShippingAddress = await ShippingAddress.findOne({
      where: { user_id: user.id, is_default: true },
    });

    const isDefault = defaultShippingAddress ? false : true;

    const shippingAddress = await ShippingAddress.create({
      user_id: user.id,
      post_code,
      address1,
      address2,
      is_default: isDefault,
    });

    res.json(shippingAddress);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.list = async (req, res, next) => {
  const user = req.user;

  if (!user) {
    // 로그인하지 않았을 경우
    console.log('로그인 안됨');
    res.end();
    return;
  }

  try {
    const shippingAddresses = await ShippingAddress.findAll({
      where: { user_id: user.id },
      order: [
        ['is_default', 'DESC'],
        ['created_at', 'DESC'],
      ],
    });

    res.json(shippingAddresses);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.read = async (req, res, next) => {
  const user = req.user;

  if (!user) {
    // 로그인하지 않았을 경우
    console.log('로그인 안됨');
    res.end();
    return;
  }

  const { id } = req.params;

  const whereClause =
    id === 'default'
      ? { user_id: user.id, is_default: true }
      : { user_id: user.id, id };

  try {
    const shippingAddress = await ShippingAddress.findOne({
      where: whereClause,
    });

    if (!shippingAddress) {
      res.status(404).end();
      return;
    }

    res.json(shippingAddress);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.update = async (req, res, next) => {
  const schema = Joi.object().keys({
    address2: Joi.string().allow('').max(100).optional(),
    is_default: Joi.boolean().required(),
  });
  const result = schema.validate(req.body);

  if (result.error) {
    res.status(400).send(result.error);
    return;
  }

  const user = req.user;
  const { id } = req.params;
  const { address2, is_default = true } = req.body;

  const valuesClause = {
    ...(address2 ? { address2 } : {}),
    is_default,
  };

  try {
    if (is_default) {
      await ShippingAddress.update(
        {
          is_default: false,
        },
        {
          where: { user_id: user.id, is_default: true },
        },
      );
    }

    const shippingAddress = await ShippingAddress.update(valuesClause, {
      where: { user_id: user.id, id },
    });

    if (shippingAddress[0] < 1) {
      res.status(404).end();
      return;
    }

    res.status(204).end();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  const user = req.user;
  const { id } = req.params;

  try {
    const shippingAddress = await ShippingAddress.findOne({
      where: { user_id: user.id, id },
    });
    await shippingAddress.destroy();

    if (shippingAddress.dataValues.is_default) {
      const anotherShippingAddress = await ShippingAddress.findOne({
        where: { user_id: user.id },
      });

      if (anotherShippingAddress) {
        anotherShippingAddress.update({ is_default: true });
      }
    }

    res.json({ id: parseInt(id) });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
