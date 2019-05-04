const db = require('../db');

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
	if (user.password !== password) {
		res.render('login', {
			error : ["Password is wrong!"],
			value : req.body
		});
		return;
	}
	res.cookie("userId", user.id);
	res.redirect('/users');
}