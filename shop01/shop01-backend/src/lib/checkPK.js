const Joi = require('joi');

const checkPK = (req, res, next) => {
  const schema = Joi.string().pattern(/^[1-9][0-9]*$/);
  const result = schema.validate(req.params.id);

  if (result.error) {
    res.status(400).send(result.error);
    return;
  }

  next();
};

module.exports = checkPK;
