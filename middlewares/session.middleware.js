const shortid = require('shortid')
const db = require('../db');

module.exports = function(req, res, next) {
	if (!req.signedCookies.sessionId) { 
		let sessionId = shortid.generate();
		res.cookie('sessionId', sessionId, {signed: true, maxAge: 259200000});
		db.get('sessions').push({id: sessionId}).write();
	}

	var products = db.get('sessions').find({id: req.signedCookies.sessionId}).get('cart').value();
	// console.log(products);
	var count = 0;
	for (let number in products) {
		// console.log(number);
		count += products[number];
	}
	res.locals.count = count;

	next();
}