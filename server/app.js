const express = require('express')
const path = require('path')
const passport = require('passport');
var GoogleStrategy = require( 'passport-google-oauth20' );
const User = require('./db/Models/User');
const googleKey = require('./env');
const cookieSession = require('cookie-session');
const { userRouter, authRouter } = require('./api');
const { sync, seed } = require('./db/');
const app = express();
const port = process.env.PORT || 3000;
const secret = process.env.JWT_SECRET || 'rosetta';
const jwt = require('jsonwebtoken');

// Middleware
app.use(express.json())
app.use(cookieSession({
    name: 'session',
    keys: ['123']
}));

// Static Files
app.use('/public',express.static(path.join(__dirname, '../public')))
app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

// Routers
app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)

// OAuth Middleware
app.use(passport.initialize()); // Used to initialize passport
app.use(passport.session()); // Used to persist login sessions

// Strategy config
passport.use(new GoogleStrategy({
    ...googleKey,
    passReqToCallback: true
  },
  async (request, accessToken, refreshToken, profile, done) => {
  	console.log(profile)
    const user = await User.findOrCreate({ where: { 
        googleId: profile.id,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName
      } 
    })
    .then(user => {
      user = {...user, token: accessToken}
      done(null, user);
    });
  }
));

// Used to stuff a piece of information into a cookie
passport.serializeUser((user, done) => {
    done(null, user);
});

// Used to decode the received cookie and persist session
passport.deserializeUser((user, done) => {
    done(null, user);
});

// Middleware to check if the user is authenticated
function isUserAuthenticated(req, res, next) {
  const token = req.headers.authorization;
  if (req.user && !token) {
    next();
  } 
  else {
  	if(!req.user ){
      res.send('You must login!');
    }
    else {
      let id = jwt.verify(token, secret).id;
      User.findById(id)
      .then(user => {
        req.user = user;
        next();
      })
      .catch(next);
    }
  }
}

app.get('/auth/google', 
  passport.authenticate('google', {
    scope: ['profile']
}));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/secret');
});

// Secret route
app.get('/secret', isUserAuthenticated, (req, res) => {
  res.redirect('/');
});

// Logout route
app.get('/logout', (req, res) => {
  req.logout(); 
  res.redirect('/login');
});


const init = () => {
  return sync()
  .then(() => seed())
}

init()

module.exports = app

app.listen(port, () => console.log(`listening on port ${port}`))
