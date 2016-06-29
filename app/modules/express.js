// requiring npm modules
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var session = require('express-session')
var passport = require('passport');


// configure Express
app.set('views', './views');
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
	secret: 'oh wow very secret much security',
	resave: true,
	saveUninitialized: false
}));

// login sessions.
app.use(passport.initialize());
app.use(passport.session());

module.exports = app