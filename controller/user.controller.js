const db = require('../db');
const shortid = require('shortid');

module.exports.getIndex = function(req, res) {
	res.render('users/index', {
		users: db.get("users").value()
	});
};

module.exports.search = function(req, res) {
	let result = db.get("users").value().filter(val => val.name.toLowerCase().indexOf(req.query.q.toLowerCase()) != -1)
	res.render('users/index', {
		q: req.query.q,
		users: result
	});
};

module.exports.viewUser = function(req, res) {
	let id = req.params.id;
	let user = db.get('users').find({id: id}).value();
	res.render('users/view', {
		user: user
	});
};

module.exports.create = function(req, res) {
	console.log(req.cookies);
	res.render('users/create');
};

module.exports.postCreate = function(req, res) {
	req.body.id = shortid.generate();
	db.get("users").push(req.body).write();
	res.redirect('/users');
};