const db = require('../db');
module.exports.getIndex = function(req, res) {
	let sessionId = req.signedCookies.sessionId;
	let productIds = db.get('sessions').find({id : sessionId}).get('cart').value();
	let cart = [];
	for (let id in productIds){
		let product = db.get('products').find({id : id}).value();
		product.pcs = productIds[id];
		cart.push(product);
	}
	// console.log(cart);
	res.render('cart/index', {
		length: cart.length,
		products: cart
	});
}

module.exports.addToCart = function(req, res) {
	let productId = req.params.id;
	let sessionId = req.signedCookies.sessionId;

	let count = db.get('sessions').find({id : sessionId}).get('cart.' + productId, 0).value();

	db.get('sessions').find({id : sessionId}).set('cart.' + productId, count + 1).write();

	res.redirect('/products');
}

module.exports.delete = function(req, res) {
	let productId = req.params.id;
	let sessionId = req.signedCookies.sessionId;
	db.get('sessions').find({id: sessionId}).unset('cart.' + productId).write();
	res.redirect('/cart');
}

module.exports.increase = function(req, res) {
	let productId = req.params.id;
	let sessionId = req.signedCookies.sessionId;
	let count = db.get('sessions').find({id : sessionId}).get('cart.' + productId, 0).value();
	db.get('sessions').find({id : sessionId}).set('cart.' + productId, count + 1).write();
	res.redirect('/cart');
}

module.exports.decrease = function(req, res) {
	let productId = req.params.id;
	let sessionId = req.signedCookies.sessionId;
	let count = db.get('sessions').find({id : sessionId}).get('cart.' + productId, 0).value();
	if (count > 1) db.get('sessions').find({id : sessionId}).set('cart.' + productId, count - 1).write();
	else db.get('sessions').find({id: sessionId}).unset('cart.' + productId).write();
	res.redirect('/cart');
}

module.exports.setPcs = function(req, res) {
	let productId = req.params.id;
	let sessionId = req.signedCookies.sessionId;
	let pcs = parseInt(req.body.pcs);
	db.get('sessions').find({id : sessionId}).set('cart.' + productId, pcs).write();
	res.redirect('/cart');
}