const express = require('express');
const controller = require('../controller/product.controller');
const Router = express.Router()

Router.get('/', controller.getIndex);
Router.get('/search', controller.search);
module.exports = Router;