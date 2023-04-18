const express = require('express');
const reviewsCtrl = require('./reviews.ctrl');
const checkParamId = require('../../../lib/middlewares/checkParamId');

const router = express.Router();

router.post('/', reviewsCtrl.write);
router.get('/', reviewsCtrl.list);
router.get('/star-rating', reviewsCtrl.readStarRating);

router.get('/:id', checkParamId, reviewsCtrl.read);

module.exports = router;
