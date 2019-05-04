const express = require('express');
const controller = require('../controller/auth.controller');
const validate = require('../validate/auth.validation');

const router = express.Router();

router.get('/login', controller.login);

router.post('/login', validate.middleware, controller.postLogin);

module.exports = router;