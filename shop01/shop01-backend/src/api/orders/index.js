const express = require('express');
const ordersCtrl = require('./orders.ctrl');

const router = express.Router();

router.all('/iamport/:device/complete', ordersCtrl.validate);
router.post('/', ordersCtrl.create);
router.get('/', ordersCtrl.list);
router.get('/:merchant_uid', ordersCtrl.read);
router.post('/refund/:merchant_uid', ordersCtrl.refund);

module.exports = router;