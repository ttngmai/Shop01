const jwt = require('jsonwebtoken');
const { roleMap } = require('../columnMap');

const checkAdmin = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    res.status(403).end(); // Forbidden
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log(decoded);

    if (decoded.role_id !== roleMap.ADMIN) {
      res.status(403).end(); // Forbidden
      return;
    }

    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = checkAdmin;
