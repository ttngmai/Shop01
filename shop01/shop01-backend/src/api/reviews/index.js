const express = require('express');
const reviewsCtrl = require('./reviews.ctrl');
const checkPK = require('../../lib/checkPK');

const router = express.Router();

router.post('/', reviewsCtrl.write);
router.get('/', reviewsCtrl.list);
router.get('/star-rating', reviewsCtrl.readStarRating);

router.get('/:id', checkPK, reviewsCtrl.read);

module.exports = router;