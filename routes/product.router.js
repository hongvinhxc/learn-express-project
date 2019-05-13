const express = require('express');
const controller = require('../controller/product.controller');
const Router = express.Router()

Router.get('/', controller.getIndex);
Router.get('/search', controller.search);
Router.get('/:id', controller.viewProduct);
module.exports = Router;