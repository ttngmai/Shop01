const express = require('express');
const categoriesCtrl = require('./categories.ctrl');

const router = express.Router();

router.get('/', categoriesCtrl.list);

module.exports = router;
