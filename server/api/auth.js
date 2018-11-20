var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const User = require('../db/User');
const googleKey = require('../env');
//const express = require('express');
//const passport = require('passport');
//const router = express.Router();

const authenticate = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  passport.use(new GoogleStrategy({
    ...googleKey,
    passReqToCallback   : true
  },
  (request, accessToken, refreshToken, profile, done) => {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
      return done(null, {
        profile: profile,
        token: accessToken
      });
  }
));
}

module.exports = { authenticate };