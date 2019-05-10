require('dotenv').config();
const express = require('express');

const user = require('./routes/user.router');
const auth = require('./routes/auth.router');
const authMiddleware = require('./middlewares/auth.middleware');
const sessionMiddleware = require('./middlewares/session.middleware');
const product = require('./routes/product.router');
const cart = require('./routes/cart.router');

const app = express();
const port = 3000;

const cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(express.static('public'));
// app.use(sessionMiddleware);
// app.use(function (req, res, next) {
//   console.log('Time: %d', Date.now());
//   console.log(req.signedCookies);
//   next();
// });

app.get('/', authMiddleware.requireAuth, sessionMiddleware, function(req, res) {
	// console.log(req.cookies,req.signedCookies);
	res.render('index');
});

app.set('view engine','pug');
app.set('views', './views')

app.use('/users', authMiddleware.requireAuth, sessionMiddleware, user);
app.use('/auth', authMiddleware.confirmAuth, auth);
app.use('/products', authMiddleware.checkUser, sessionMiddleware, product);
app.use('/cart', authMiddleware.checkUser, sessionMiddleware, cart);
app.get('/logout', authMiddleware.logout);

app.listen(port, () => console.log(`Server is listening on port ${port}`));