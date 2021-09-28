const Joi = require('joi');
const User = require('../../models/user');

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
  });
  const result = schema.validate(req.body);

  if (result.error) {
    res.status(400).end(); // Bad Request
    return;
  }

  const { email, password, nick, phone } = req.body;

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
    });
    await user.setPassword(password);
    await user.save();

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

  res.json(user);
};

exports.logout = async (req, res) => {
  res.clearCookie('access_token').status(204).end();
};
