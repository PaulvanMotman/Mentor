// declaring dependencies
var express = require('express');
var passport = require('passport');
var db = require('./database');
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

passport.use(new LinkedInStrategy({
  clientID: process.env.LINKEDIN_CLIENT_ID,
  clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/linkedin/callback",
  scope: ['r_emailaddress', 'r_basicprofile'],
  state: true
}, 
  function(accessToken, refreshToken, profile, done) {
    console.log(profile)
    profile.accessToken = accessToken;
    findOrCreateUser = function(){
      db.mentee.find({ where: {'lnkid' :  profile.id }}).then(function(mentee) {
        // already exists
        if (mentee) {
          console.log('Mentee already exists with this ID ');
          return;
        } else {
          // if there is no mentee with that linkedin id
          // create the mentee
          console.log('Cant find Mentee, now I create a new Mentee')

          // save the user
          db.mentee.create({
            'lnkid': profile.id,
            'firstname': profile.name.givenName,
            'lastname': profile.name.familyName
          }).then(function(mentee) {
            console.log('Mentee Registration successful');
            return;    
          });
         }
      });
    };
    process.nextTick(findOrCreateUser);
    return done(null, profile);
  }
));



passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

