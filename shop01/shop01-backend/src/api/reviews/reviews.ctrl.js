const Joi = require('joi');
const { sequelize } = require('../../models');
const Review = require('../../models/review');
const ReviewImage = require('../../models/reviewImage');
const User = require('../../models/user');

exports.write = async (req, res, next) => {
  const schema = Joi.object().keys({
    star_rating: Joi.number().min(1).max(5).required(),
    text: Joi.string().required(),
    product_id: Joi.number().required(),
  });
  const result = schema.validate(req.body);

  if (result.error) {
    res.status(400).send(result.error); // Bad Request
    return;
  }

  const user = req.user;
  const { star_rating, text, product_id } = req.body;

  try {
    const review = await Review.create({
      star_rating,
      text,
      product_id,
      user_id: user.id,
    });

    res.json(review);
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

  const { product } = req.query;

  try {
    const reviewsPerPage = 2;
    const reviews = await Review.findAll({
      where: { product_id: product },
      include: [
        {
          model: User,
          attributes: ['nick'],
        },
      ],
      order: [['created_at', 'DESC']],
      limit: reviewsPerPage,
      offset: (page - 1) * reviewsPerPage,
    });

    const { count: reviewsTotalCount } = await Review.findAndCountAll({
      where: { product_id: product },
    });

    res
      .set('Reviews-Total-Page', Math.ceil(reviewsTotalCount / reviewsPerPage))
      .json(reviews);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.readStarRating = async (req, res, next) => {
  const { product } = req.query;

  try {
    const starRatingDistribution = await Review.findAll({
      where: { product_id: product },
      attributes: ['star_rating', [sequelize.fn('COUNT', '*'), 'count']],
      group: ['star_rating'],
    });

    const starRatingChartInfo = await Review.findAll({
      where: { product_id: product },
      attributes: [
        [sequelize.fn('COUNT', sequelize.col('id')), 'reviews_total_count'],
        [
          sequelize.fn(
            'TRUNCATE',
            sequelize.fn('AVG', sequelize.col('star_rating')),
            1,
          ),
          'star_rating_average',
        ],
      ],
    });

    const data = {
      starRatingDistribution:
        starRatingDistribution.length > 0 ? starRatingDistribution : null,
      totalCount:
        starRatingChartInfo.length > 0
          ? starRatingChartInfo[0].dataValues.reviews_total_count
          : 0,
      starRatingAverage:
        starRatingChartInfo.length > 0
          ? starRatingChartInfo[0].dataValues.star_rating_average
          : null,
    };

    res.json(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.read = async (req, res, next) => {
  const { id } = req.params;

  try {
    const review = await Review.findOne({
      where: { id },
    });

    if (!review) {
      res.status(404).end();
      return;
    }

    res.json(review);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
