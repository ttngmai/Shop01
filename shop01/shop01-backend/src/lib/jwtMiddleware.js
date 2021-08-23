const jwt = require('jsonwebtoken');
const User = require('../models/user');

const jwtMiddleware = async (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log(decoded);

    req.user = {
      email: decoded.email,
      nick: decoded.nick,
      role_id: decoded.role_id,
    };

    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp - now < 60 * 60 * 24 * 3.5) {
      const user = await User.findByEmail(decoded.email);
      const token = user.generateToken();

      res.cookie('access_token', token, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      });
    }

    return next();
  } catch (err) {
    return next();
  }
};

module.exports = jwtMiddleware;
