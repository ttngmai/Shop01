const express = require('express');
const auth = require('./auth');
const products = require('./products');
const categories = require('./categories');
const orders = require('./orders');

const router = express.Router();

router.use('/auth', auth);
router.use('/products', products);
router.use('/categories', categories);
router.use('/orders', orders);

module.exports = router;
