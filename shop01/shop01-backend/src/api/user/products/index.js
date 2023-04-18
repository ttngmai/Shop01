const express = require('express');
const productsCtrl = require('./products.ctrl');
const checkParamId = require('../../../lib/middlewares/checkParamId');

const router = express.Router();

router.get('/', productsCtrl.list);

router.get('/:id', checkParamId, productsCtrl.read);

module.exports = router;
