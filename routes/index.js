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


//YOUR ACCOUNT PAGE WITH OVERVIEW OF REPOS
//   router.get('/account', ensureAuthenticated, function(req, res){
//     db.user.findOne({
//       where: {
//         ghid: req.user.id 
//       }
//     }).then(function(user){
//       var user = user
//       var options = {
//         url: user.reposurl,
//         headers: {
//           'User-Agent': 'request'
//         }
//       }
//       request(options, function (error, response, body) {
//         if (!error) {
//           console.log("it worked!") 
//           res.render('account', { repos: JSON.parse(body), user: user });
//         } else {
//           res.send(error)
//         }
//       })
//     })
//   });


// //LOGIN GH
//   router.get('/auth/github',
//     passport.authenticate('github', { scope: [ 'user:email'] }),
//     function(req, res){
//     });

// // RETURN AFTER LOGIN GH
//   router.get('/auth/github/cb', 
//     passport.authenticate('github', { failureRedirect: '/login' }),
//     function(req, res) {
//       res.redirect('/account');
//     });

//   router.get('/logout', function(req, res){
//     req.logout();
//     res.redirect('/');
//   });


  return router;
}
