const express = require('express');
const cartsCtrl = require('./carts.ctrl');

const router = express.Router();

router.post('/', cartsCtrl.create);
router.get('/', cartsCtrl.read);
router.delete('/:id', cartsCtrl.delete);

module.exports = router;