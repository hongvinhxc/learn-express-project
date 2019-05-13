const express = require('express');
const controller = require('../controller/cart.controller');
const router = express.Router();

router.get('/', controller.getIndex);
router.get('/:id', controller.addToCart);
router.get('/delete/:id', controller.delete);
router.get('/increase/:id', controller.increase);
router.get('/decrease/:id', controller.decrease);

router.post('/:id/set', controller.setPcs);

module.exports = router;