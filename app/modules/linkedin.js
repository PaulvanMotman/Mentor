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

          // save the mentee
          db.mentee.create({
            'lnkid': profile.id,
            'firstname': profile.name.givenName,
            'lastname': profile.name.familyName,
            'jobsummary': profile._json.positions.values[0].summary,
            'companyname': profile._json.positions.values[0].company.name,
            'companyindustry': profile._json.positions.values[0].company.industry,
            'jobtitle': profile._json.positions.values[0].title,
            'email': profile.emails[0].value, 
            'workfield': profile._json.industry,
            'headline': profile._json.currentShare.headline,
            'location': profile._json.location.name,
            'picture': profile._json.pictureUrls.values[0],
            'summary': profile._json.summary,
            'profileurl': profile._json.publicProfileUrl
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

passport.use(new LinkedInStrategy({
  clientID: process.env.LINKEDIN_CLIENT_ID,
  clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/linkedin/callback2",
  scope: ['r_emailaddress', 'r_basicprofile'],
  state: true
}, 
  function(accessToken, refreshToken, profile, done) {
    console.log(profile)
    profile.accessToken = accessToken;
    findOrCreateUser = function(){
      db.mentor.find({ where: {'lnkid' :  profile.id }}).then(function(mentor) {
        // already exists
        if (mentor) {
          console.log('Mentor already exists with this ID ');
          return;
        } else {
          // if there is no mentor with that linkedin id
          // create the mentor
          console.log('Cant find Mentor, now I create a new Mentor')

          // save the mentor
          db.mentor.create({
            'lnkid': profile.id,
            'firstname': profile.name.givenName,
            'lastname': profile.name.familyName,
            'jobsummary': profile._json.positions.values[0].summary,
            'companyname': profile._json.positions.values[0].company.name,
            'companyindustry': profile._json.positions.values[0].company.industry,
            'jobtitle': profile._json.positions.values[0].title,
            'email': profile.emails[0].value, 
            'workfield': profile._json.industry,
            'headline': profile._json.currentShare.headline,
            'location': profile._json.location.name,
            'picture': profile._json.pictureUrls.values[0],
            'summary': profile._json.summary,
            'profileurl': profile._json.publicProfileUrl
          }).then(function(mentee) {
            console.log('Mentor Registration successful');
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

