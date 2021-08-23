const express = require('express');
const authCtrl = require('./auth.ctrl');

const router = express.Router();

router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);
router.get('/check', authCtrl.check);
router.post('/logout', authCtrl.logout);

module.exports = router;
