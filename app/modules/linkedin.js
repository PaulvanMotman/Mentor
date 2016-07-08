// declaring dependencies
var express = require('express');
var passport = require('passport');
var db = require('./database');
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

passport.use('mentee', new LinkedInStrategy({
  clientID: process.env.LINKEDIN_CLIENT_ID,
  clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/linkedin/callback",
  scope: ['r_emailaddress', 'r_basicprofile'],
  state: true
}, 
  function(accessToken, refreshToken, profile, done) {
    profile.accessToken = accessToken;

    if (profile.emails == undefined) {
      profile.emails = [{value: ''}]
    }

    if (typeof profile._json.industry === "undefined") {
      profile._json.industry = "Add the industry you'e active in"
    }

    if (typeof profile._json.currentShare.headline === "undefined") {
      profile._json.currentShare.headline = "Add you're headline"
    }

    if (typeof profile._json.location === "undefined") {
      profile._json.location = {name: 'Where are you located?'}
    }

    if (profile._json.pictureUrls == undefined) {
      profile._json.pictureUrls = {values: ['http://cdn.playbuzz.com/cdn/6ad14a1c-2688-4303-82c5-f6c6445addea/4065eaff-db22-44bf-b9d9-0d978ca1de61.jpg']}
    }

    if (typeof profile._json.summary === "undefined") {
      profile._json.summary = 'Add a summary'
    }

    if (typeof profile._json.publicProfileUrl === "undefined") {
      profile._json.publicProfileUrl = 'Include a link to your linkedIn'
    }

    if (profile._json.positions.values == undefined){
      profile._json.positions.values = [{summary: 'Summary of your job', company: {name: 'Where do you work?', industry: 'In which industry do you work?'}, title: 'Add a job title'}];
    } 

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

passport.use('mentor', new LinkedInStrategy({
  clientID: process.env.LINKEDIN_CLIENT_ID,
  clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/linkedin/callback2",
  scope: ['r_emailaddress', 'r_basicprofile'],
  state: true
}, 
  function(accessToken, refreshToken, profile, done) {
    profile.accessToken = accessToken;

    if (profile.emails == undefined) {
      profile.emails = [{value: ''}]
    }

    if (typeof profile._json.industry === "undefined") {
      profile._json.industry = "Add the industry you'e active in"
      console.log('profile._json.industry is checked')
    }

    if (typeof profile._json.currentShare.headline === "undefined") {
      profile._json.currentShare.headline = "Add you're headline"
    }

    if (typeof profile._json.location === "undefined") {
      profile._json.location = {name: 'Where are you located?'}
    }

    if (profile._json.pictureUrls == undefined) {
      profile._json.pictureUrls = {values: ['http://cdn.playbuzz.com/cdn/6ad14a1c-2688-4303-82c5-f6c6445addea/4065eaff-db22-44bf-b9d9-0d978ca1de61.jpg']}
    }

    if (typeof profile._json.summary === "undefined") {
      profile._json.summary = 'Add a summary'
    }

    if (typeof profile._json.publicProfileUrl === "undefined") {
      profile._json.publicProfileUrl = 'Include a link to your linkedIn'
      console.log('profile._json.publicProfileUrl is checked')
    }

    if (profile._json.positions.values == undefined){
      profile._json.positions.values = [{summary: 'Summary of your job', company: {name: 'Where do you work?', industry: 'In which industry do you work?'}, title: 'Add a job title'}];
    } 

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

