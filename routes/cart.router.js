const express = require('express');
const controller = require('../controller/cart.controller');
const router = express.Router();

router.get('/', controller.getIndex);
router.get('/:id', controller.addToCart);
module.exports = router;