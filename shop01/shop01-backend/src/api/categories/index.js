const express = require('express');
const categoriesCtrl = require('./categories.ctrl');

const router = express.Router();

router.post('/', categoriesCtrl.create);
router.get('/', categoriesCtrl.list);
router.patch('/:id', categoriesCtrl.update);
router.delete('/:id', categoriesCtrl.delete);

module.exports = router;
