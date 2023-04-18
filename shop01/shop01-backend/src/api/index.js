const express = require('express');
const admin = require('./admin');
const user = require('./user');
const checkAdmin = require('../lib/middlewares/checkAdmin');

const router = express.Router();

router.use('/', user);
router.use('/admin', checkAdmin, admin);

module.exports = router;
