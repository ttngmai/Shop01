const Joi = require('joi');

const checkParamId = (req, res, next) => {
  const schema = Joi.string().pattern(/^[1-9][0-9]*$/);
  const result = schema.validate(req.params.id);

  if (result.error) {
    res.status(400).send(result.error); // Bad Request
    return;
  }

  next();
};

module.exports = checkParamId;
