/// NPM modules
// var GitHubStrategy = require('passport-github2').Strategy;
var app = require('./app/modules/express');
var passport = require('passport');
var express = require('express')
var pg = require('pg')

///static folders
app.use(express.static('./public'));

// Initialize github API
// var github = require('./app/modules/linkedin')


// Initialize Router
var routes = require('./routes/index')(passport);
app.use('/', routes);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


/// This part tells the app to listen to a server
var server = app.listen(3000, function (){
	console.log ('Application listening on: ' + server.address().port)
});
