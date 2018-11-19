var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const User = require('../db/User');
const express = require('express');
const passport = require('passport');
const router = express.Router();

const authenticate = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  passport.use(new GoogleStrategy({
    clientID:     '126317270450-sd9fvuco3pu5e5il4e1tj043gbc9l9t1.apps.googleusercontent.com',
    clientSecret: 'GhdPMS5SPPv7zaQDexTTo-xv',
    callbackURL: "http://localhost:3000/auth/google/callback",
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