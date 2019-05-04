const express = require('express');
const user = require('./routes/user.router');
const auth = require('./routes/auth.router');
const middleware = require('./auth/auth.middleware');

const app = express();
const port = 3000;

const cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser("doanxem"));

app.get('/', middleware.requireAuth, function(req, res) {
	// console.log(req.cookies,req.signedCookies);
	res.render('index');
});
app.use(express.static('public'));

app.set('view engine','pug');
app.set('views', './views')

app.use('/users', middleware.requireAuth, user);
app.use('/auth', middleware.confirmAuth, auth);
app.get('/logout', function(res, res) {
	res.clearCookie("userId");
	res.redirect('/');
})

app.listen(port, () => console.log(`Server is listening on port ${port}`));