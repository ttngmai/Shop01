const Joi = require('joi');
const User = require('../../../models/user');
const Role = require('../../../models/role');
const ShippingAddress = require('../../../models/shippingAddress');

exports.register = async (req, res, next) => {
  const schema = Joi.object().keys({
    email: Joi.string()
      .email({ tlds: { allow: ['com', 'net'] } })
      .required(),
    password: Joi.string().required(),
    nick: Joi.string().max(15).required(),
    phone: Joi.string()
      .pattern(/^[0-9]*$/)
      .max(11)
      .required(),
    postCode: Joi.string().max(5).required(),
    address1: Joi.string().max(100).required(),
    address2: Joi.string().allow('').max(100).optional(),
  });
  const result = schema.validate(req.body);

  if (result.error) {
    console.log(result.error);
    res.status(400).end(); // Bad Request
    return;
  }

  const {
    email,
    password,
    nick,
    phone,
    postCode: post_code,
    address1,
    address2,
  } = req.body;

  try {
    const exists = await User.findByEmail(email);

    if (exists) {
      res.status(409).end(); // Conflict
      return;
    }

    const user = await User.build({
      email,
      nick,
      phone,
      RoleId: 1,
    });
    await user.setPassword(password);
    await user.save();

    await ShippingAddress.create({
      post_code,
      address1,
      address2,
      is_default: true,
      user_id: user.id,
    });

    const token = user.generateToken();
    const data = user.serialize();

    res
      .cookie('access_token', token, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      })
      .json(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(401).end(); // Unauthorized (실질적 의미는 Unauthenticated)
    return;
  }

  try {
    const user = await User.findByEmail(email);

    if (!user) {
      res.status(401).end(); // Unauthorized (실질적 의미는 Unauthenticated)
      return;
    }

    const valid = await user.checkPassword(password);

    if (!valid) {
      res.status(401).end();
      return;
    }

    const token = user.generateToken();
    const data = user.serialize();

    res
      .cookie('access_token', token, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      })
      .json(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.check = async (req, res) => {
  const user = req.user;

  if (!user) {
    res.status(401).end();
    return;
  }

  try {
    const data = await User.findOne({
      where: { id: user.id },
      attributes: { exclude: ['password', 'RoleId'] },
      include: [
        {
          model: Role,
        },
      ],
    });

    res.json(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.logout = async (req, res) => {
  res.clearCookie('access_token').status(204).end();
};
