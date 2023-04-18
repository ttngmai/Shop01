const express = require('express');
const products = require('./products');
const categories = require('./categories');

const router = express.Router();

router.use('/products', products);
router.use('/categories', categories);

module.exports = router;
