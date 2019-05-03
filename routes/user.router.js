const express = require('express');
const shortid = require('shortid');
const cookieParser = require('cookie-parser');
const db = require('../db');
const controller = require('../controller/user.controller');
const validate = require('../validate/user.validation');

const router = express.Router();

var bodyParser = require('body-parser');
router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
router.use(cookieParser());

router.get('/cookie', function(req, res) {
	res.cookie('user-id', 12345);
	res.send('Hello');
});

router.get('/', controller.getIndex);

router.get('/search', controller.search);

router.get('/create', controller.create); 

router.get('/:id', controller.viewUser);

router.post('/create', validate.middleware, controller.postCreate);


module.exports = router;