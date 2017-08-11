const express = require('express');
const hbs = require('hbs');
const moment = require('moment');
const fs = require('fs');

const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs'); // Handle Bars

app.use((req, res, next) => { // Middleware
	const now = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
	const log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log('Unable to append to server.log');
		}
	});
	next();
});

// app.use((req, res) => { // Took the 'next' variable out, and it works
// 	res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => text.toUpperCase());

app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Welcome!',
		welcomeMessage: 'Welcome to the home page!'
	});
});

app.get('/about', (req, res)  => {
	res.render('about.hbs', {
		pageTitle: 'About Page'
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'Unable to handle request'
	});
});

app.listen(3000, () => {
	console.log('Server is up on port 3000');
});
