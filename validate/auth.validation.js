module.exports.middleware = function(req, res, next) {
	var errors = [];
	if (!req.body.email) errors.push("Email hasn't been entered.");
	if (!req.body.password) errors.push("Password hasn't been entered.");
	if (errors.length) {
		res.render('login', {
			error: errors,
			value: req.body
		});
		return;
	} 
	next();
}