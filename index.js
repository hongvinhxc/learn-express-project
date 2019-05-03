const express = require('express');
const user = require('./routes/user.router');

const app = express();
const port = 3000;

app.get('/', function(req, res) {
	res.render('index', {
		name: "Vinh"
	});
});
app.use(express.static('public'));

app.set('view engine','pug');
app.set('views', './views')

app.use('/users',user);

app.listen(port, () => console.log(`Server is listening on port ${port}`));