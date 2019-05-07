const express = require('express');
const multer  = require('multer');
const shortid = require('shortid');

const db = require('../db');
const controller = require('../controller/user.controller');
const validate = require('../validate/user.validation');

const router = express.Router();
const upload = multer({ dest: './public/uploads/' });


router.get('/cookie', function(req, res) {
	res.send('Hello');
});

router.get('/', controller.getIndex);

router.get('/search', controller.search);

router.get('/create', controller.create); 

router.get('/view/:id', controller.viewUser);

router.post('/create', upload.single('avatar'), validate.middleware, controller.postCreate);

module.exports = router;