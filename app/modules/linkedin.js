// declaring dependencies
var express = require('express');
var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;
var db = require('./database');

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/github/cb",
    profileFields: ['repo']
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile)
    profile.accessToken = accessToken;
    findOrCreateUser = function(){
      db.user.find({ where: {'lnkid' :  profile.id }}).then(function(user) {
        // already exists
        if (user) {
          console.log('User already exists with this username ');
          return;
        } else {
          // if there is no user with that github id
          // create the user
          console.log('Cant find user, now I create a new user')

          // save the user
          db.user.create({
            'ghid': profile.id,
            'firstname': profile.username,
            'lastname': profile._json.repos_url
          }).then(function(user) {
            console.log('User Registration successful');
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

