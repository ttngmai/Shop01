const express = require('express');
const productsCtrl = require('./products.ctrl');
const checkPK = require('../../lib/checkPK');
const { uploadImage } = require('../../lib/upload');

const router = express.Router();

router.post(
  '/',
  uploadImage.array('images'),
  productsCtrl.register,
);
router.get('/', productsCtrl.list);

router.get('/:id', checkPK, productsCtrl.read);
router.patch('/:id', checkPK, productsCtrl.update);
router.delete('/:id', checkPK, productsCtrl.delete);

module.exports = router;
