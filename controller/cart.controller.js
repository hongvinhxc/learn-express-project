const db = require('../db');
module.exports.getIndex = function(req, res) {
	res.render('cart/index');
}

module.exports.addToCart = function(req, res) {
	let productId = req.params.id;
	let sessionId = req.signedCookies.sessionId;

	let count = db.get('sessions').find({id : sessionId}).get('cart.' + productId, 0).value();

	db.get('sessions').find({id : sessionId}).set('cart.' + productId, count + 1).write();

	res.redirect('/products');
}