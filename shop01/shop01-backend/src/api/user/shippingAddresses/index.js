const express = require('express');
const shippingAddressesCtrl = require('./shippingAddresses.ctrl');

const router = express.Router();

router.post('/', shippingAddressesCtrl.register);
router.get('/', shippingAddressesCtrl.list);

router.get('/:id', shippingAddressesCtrl.read);
router.patch('/:id', shippingAddressesCtrl.update);
router.delete('/:id', shippingAddressesCtrl.delete);

module.exports = router;
