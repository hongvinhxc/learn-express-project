const shortid = require('shortid')
const db = require('../db');

module.exports = function(req, res, next) {
	if (!req.signedCookies.sessionId) {
		let sessionId = shortid.generate();
		res.cookie('sessionId', sessionId, {signed: true, maxAge: 259200});
		db.get('sessions').push({id: sessionId}).write();
	}
	next();
}