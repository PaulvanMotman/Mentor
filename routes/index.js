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


// // YOUR ACCOUNT PAGE WITH OVERVIEW OF REPOS
  router.get('/home', ensureAuthenticated, function(req, res){
    db.mentee.findOne({
      where: {
        lnkid: req.user.id 
      }
    }).then(function(mentee){
      if (mentee) {
        res.render('home', {
          lnkid: mentee.lnkid,
          firstname: mentee.firstname,
          lastname: mentee.lastname,
          jobsummary: mentee.jobsummary,
          companyname: mentee.companyname,
          companyindustry: mentee.companyindustry,
          jobtitle: mentee.jobtitle,
          email: mentee.email,
          workfield: mentee.workfield,
          headline: mentee.headline,
          location: mentee.location,
          picture: mentee.picture,
          summary: mentee.summary,
          profileurl: mentee.profileurl
        })
      }
      else {
        db.mentor.findOne({
          where: {
            lnkid: req.user.id 
          }
        }).then(function(mentor){
          res.render('home', {
            lnkid: mentor.lnkid,
            firstname: mentor.firstname,
            lastname: mentor.lastname,
            jobsummary: mentor.jobsummary,
            companyname: mentor.companyname,
            companyindustry: mentor.companyindustry,
            jobtitle: mentor.jobtitle,
            email: mentor.email,
            workfield: mentor.workfield,
            headline: mentor.headline,
            location: mentor.location,
            picture: mentor.picture,
            summary: mentor.summary,
            profileurl: mentor.profileurl
          })
        })
      }
    })
  });


//LOGIN LINKEDIN MENTEE
  router.get('/auth/linkedin',
    passport.authenticate('mentee'),
    function(req, res){
    // The request will be redirected to LinkedIn for authentication, so this
    // function will not be called.
  });

// RETURN AFTER LOGIN LINKEDIN
  router.get('/auth/linkedin/callback', 
    passport.authenticate('mentee', {
      successRedirect: '/home',
      failureRedirect: '/login'
    })
  );

  //LOGIN LINKEDIN MENTOR
  router.get('/auth/linkedin2',
    passport.authenticate('mentor'),
    function(req, res){
    // The request will be redirected to LinkedIn for authentication, so this
    // function will not be called.
  });

// RETURN AFTER LOGIN LINKEDIN
  router.get('/auth/linkedin/callback2', 
    passport.authenticate('mentor', {
      successRedirect: '/home',
      failureRedirect: '/login'
    })
  );

  router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

  router.get('/updatelinkedinstats', ensureAuthenticated, function(req, res){
    db.mentee.findOne({
      where: {
        lnkid: req.query.lnkid 
      }
    }).then(function(mentee){
      if (mentee) {
        mentee.updateAttributes({
          jobtitle: req.query.jobtitle,
          companyname: req.query.companyname,
          workfield: req.query.workfield,
          location: req.query.location,
          profileurl: req.query.profileurl
        })
      }
      else {
        db.mentor.findOne({
          where: {
            lnkid: req.query.lnkid
          }
        }).then(function(mentor){
          mentor.updateAttributes({
            jobtitle: req.query.jobtitle,
            companyname: req.query.companyname,
            workfield: req.query.workfield,
            location: req.query.location,
            profileurl: req.query.profileurl
          })
        })
      }
    })
  })

  router.get('/updatesummary', ensureAuthenticated, function(req, res){
    db.mentee.findOne({
      where: {
        lnkid: req.query.lnkid 
      }
    }).then(function(mentee){
      if (mentee) {
        mentee.updateAttributes({
          summary: req.query.summary
        })
      }
      else {
        db.mentor.findOne({
          where: {
            lnkid: req.query.lnkid
          }
        }).then(function(mentor){
          mentor.updateAttributes({
            summary: req.query.summary
          })
        })
      }
    })
  })

   router.get('/updatejob', ensureAuthenticated, function(req, res){
    db.mentee.findOne({
      where: {
        lnkid: req.query.lnkid 
      }
    }).then(function(mentee){
      if (mentee) {
        mentee.updateAttributes({
          jobsummary: req.query.jobsummary,
          jobtitle:req.query.jobtitle
        })
      }
      else {
        db.mentor.findOne({
          where: {
            lnkid: req.query.lnkid
          }
        }).then(function(mentor){
          mentor.updateAttributes({
            jobsummary: req.query.jobsummary,
            jobtitle:req.query.jobtitle
          })
        })
      }
    })
  })

   router.get('/searchquery', function(req, res){
    db.mentee.findOne({
      where: {
        firstname: req.query.firstname
      }
    }).then(function(mentee){
      if (mentee) {
        
      }
      else {
        db.mentor.findOne({
          where: {
            firstname: req.query.firstname
          }
        }).then(function(mentor){

        })
      }
    })
  })


  router.post('/searchresult', function (request, response) {
    console.log("THIS IS THE USERS: ---> " + request.body.users)
    var username = request.body.users[0].toUpperCase() + request.body.users.slice(1);
    console.log("post request received for: " + username + ' of type ' + typeof username);
    var storeUser = []
    var ajax = request.body.ajax

    db.mentee.findOne({
      where: {

        ////////////OLD CODE /////////////////

        // firstname: {
        //   $contains: username
        // }

        firstname: {
          $like: username
        }
      }
    }).then(function(mentee){
      console.log(mentee)
      if (mentee) {
        storeUser.push(mentee)
        if (!ajax) {
           response.render('profile', {
            storeuser: storeUser
          })
        }
        else {
          response.send(storeUser)
        }
      }
      else {
        db.mentor.findOne({
          where: {

            ////////////OLD CODE /////////////////

            // firstname: {
            //   $contains: username
            // }

            firstname: {
              $like: username
            }
          }
        }).then(function(mentor){
          if (!ajax) {
            storeUser.push(mentor)
            response.render('profile', {
              storeuser: storeUser
            })
          }
          else {
            response.send(storeUser)
          }
        })
      }
    })
  })

  return router;
}
