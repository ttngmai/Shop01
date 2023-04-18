const express = require('express');
const productsCtrl = require('./products.ctrl');
const checkParamId = require('../../../lib/middlewares/checkParamId');
const { uploadImage } = require('../../../lib/upload');

const router = express.Router();

router.post('/', uploadImage.array('images'), productsCtrl.register);
router.get('/', productsCtrl.list);

router.patch('/:id', checkParamId, productsCtrl.update);
router.patch('/:id/display', checkParamId, productsCtrl.updateDisplay);
router.delete('/:id', checkParamId, productsCtrl.delete);

module.exports = router;
