const db = require('../db');

module.exports.getIndex = function(req, res) {
	let page = parseInt(req.query.page) || 1;
	let number = Math.ceil(db.get("products").value().length/8);
	listProduct = db.get("products").value().slice((page-1)*8, page*8);
	res.render('products/index', {
		list : listProduct,
		page : page,
		allPage: number,
		url: 'products?'
	});
}

module.exports.search = function(req, res) {
	let key = req.query.q;
	let page = req.query.page || 1;
	let filterProducts = db.get("products").value().filter(product => product.name.toLowerCase().indexOf(key.toLowerCase())!=-1);
	let number = Math.ceil(filterProducts.length/8);
	listProduct = filterProducts.slice((page-1)*8, page*8);
	res.render('products/index', {
		q: key,
		list : listProduct,
		page : page,
		allPage: number,
		url: 'products/search?q=' + key +"&"
	});
}

module.exports.viewProduct = function(req, res) {
	let id = req.params.id;
	let product = db.get("products").find({id: id}).value();
	res.render('products/product', {
		product: product
	})
}