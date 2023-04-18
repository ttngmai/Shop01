const express = require('express');
const cartsCtrl = require('./carts.ctrl');

const router = express.Router();

router.post('/', cartsCtrl.create);
router.get('/', cartsCtrl.read);

router.patch('/:id', cartsCtrl.update);
router.delete('/:id', cartsCtrl.delete);
router.post('/destroy', cartsCtrl.deleteItems);

module.exports = router;