const express = require('express');
var router = express.Router();
var db = require('../app/modules/database');
// var request = require('request');

function ensureAuthenticated(req, res, next) {
  // if user is authenticated in the session, call the next() to call the next request handler 
  if (req.isAuthenticated()) { return next(); }
  // if the user is not authenticated then redirect him to the login page
  res.redirect('/login')
}

module.exports = function(passport){

//HOME PAGE
  router.get('/', function(req, res){
    res.render('index');
    console.log("this works")
  });


// YOUR ACCOUNT PAGE WITH OVERVIEW OF REPOS
  router.get('/home', ensureAuthenticated, function(req, res){
    db.mentee.findOne({
      where: {
        lnkid: req.user.id 
      }
    }).then(function(mentee){
      res.send(mentee.firstname)
    })
  });


//LOGIN LINKEDIN
  router.get('/auth/linkedin',
    passport.authenticate('linkedin'),
    function(req, res){
    // The request will be redirected to LinkedIn for authentication, so this
    // function will not be called.
  });

// RETURN AFTER LOGIN LINKEDIN
  router.get('/auth/linkedin/callback', 
    passport.authenticate('linkedin', {
      successRedirect: '/home',
      failureRedirect: '/login'
    })
  );

  //LOGIN LINKEDIN
  router.get('/auth/linkedin2',
    passport.authenticate('linkedin'),
    function(req, res){
    // The request will be redirected to LinkedIn for authentication, so this
    // function will not be called.
  });

// RETURN AFTER LOGIN LINKEDIN
  router.get('/auth/linkedin/callback2', 
    passport.authenticate('linkedin', {
      successRedirect: '/home',
      failureRedirect: '/login'
    })
  );

  router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });


  return router;
}
