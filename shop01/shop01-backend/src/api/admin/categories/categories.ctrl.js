const Joi = require('joi');
const ProductCategory = require('../../../models/productCategory');

exports.create = async (req, res, next) => {
  const schema = Joi.object()
    .keys({
      name: Joi.string().max(20).required(),
    })
    .unknown(true);
  const result = schema.validate(req.body);

  if (result.error) {
    console.log(result.error);
    res.status(400).end(); // Bad Request
    return;
  }

  const { id, name } = req.body;

  try {
    if (id) {
      const parentCategory = await ProductCategory.findOne({
        where: { id },
      });
      const subCategory = await ProductCategory.create({
        name,
        depth: parentCategory.dataValues.depth + 1,
      });

      await parentCategory.addSubCategory(subCategory);

      res.json(subCategory);
    } else {
      const category = await ProductCategory.create({ name });

      res.json(category);
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.update = async (req, res, next) => {
  const schema = Joi.object().keys({
    params: Joi.object().keys({
      id: Joi.string().required(),
    }),
    body: Joi.object().keys({
      name: Joi.string().max(20).required(),
    }),
  });
  const result = schema.validate({ params: req.params, body: req.body });

  if (result.error) {
    res.status(400).end(); // Bad Request
    return;
  }

  const { id } = req.params;
  const { name } = req.body;

  try {
    const updatedCategoryCount = await ProductCategory.update(
      { name },
      { where: { id } },
    );

    if (updatedCategoryCount[0] < 1) {
      res.status(404).end();
      return;
    }

    res.json(updatedCategoryCount[0]);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  const { id } = req.params;

  try {
    await ProductCategory.destroy({
      where: { id },
    });

    res.status(204).end();
  } catch (err) {
    console.log(err);
    next(err);
  }
};
