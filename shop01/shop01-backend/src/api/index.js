const express = require('express');
const auth = require('./auth');
const products = require('./products');
const categories = require('./categories');
const carts = require('./carts');
const orders = require('./orders');
const reviews = require('./reviews');

const router = express.Router();

router.use('/auth', auth);
router.use('/products', products);
router.use('/categories', categories);
router.use('/carts', carts);
router.use('/orders', orders);
router.use('/reviews', reviews);

module.exports = router;
