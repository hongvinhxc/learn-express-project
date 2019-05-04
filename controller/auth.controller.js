const db = require('../db');
const md5 = require('md5');

module.exports.login = function(req, res) {
	res.render('login');
}

module.exports.postLogin = function(req, res) {
	let email = req.body.email;
	let user = db.get('users').find({ email: email }).value();
	if (!user) {
		res.render('login', {
			error : ["User does not exit!"]
		});
		return;
	}

	let password = req.body.password;
	if (user.password !== md5(password)) {
		res.render('login', {
			error : ["Password is wrong!"],
			value : req.body
		});
		return;
	}
	res.cookie("userId", user.id, {signed: true});
	res.redirect('/users');
}