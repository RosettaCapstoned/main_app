const express = require('express')
const path = require('path')
const passport = require('passport');
var GoogleStrategy = require( 'passport-google-oauth20' );
const User = require('./db/Models/User');
const googleKey = require('./env');
const cookieSession = require('cookie-session');
const { userRouter, authRouter, translateRouter } = require('./api');
const { sync, seed } = require('./db/');
const app = express();
const port = process.env.PORT || 3000;
const secret = process.env.JWT_SECRET || 'rosetta';
const jwt = require('jsonwebtoken');

const bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware
// app.use(express.json())
app.use(cookieSession({
    name: 'session',
    keys: ['123']
}));

// JWT Token Auth Middleware
app.use((req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return next();
  }
  let id;
  try {
    id = jwt.decode(token, secret).id;
    User.findById(id)
      .then(user => {
        req.user = user;
        next();
      })
      .catch(next);
  } catch (ex) {
    next({ status: 401 });
  }
});

// Routers
app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/translate', translateRouter)

// OAuth Middleware
app.use(passport.initialize()); // Used to initialize passport
app.use(passport.session()); // Used to persist login sessions

// Strategy config
passport.use(new GoogleStrategy({
    clientID: googleKey.clientID,
    clientSecret: googleKey.clientSecret,
    callbackURL: googleKey.callbackURL,
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
  if (req.user) {
    next();
  } 
  else {
      res.send('You must login!');
    }
}

app.get('/auth/google', 
  passport.authenticate('google', {
    scope: ['profile']
}));

app.post('/auth/google', (req, res, next) => {
  console.log(req.user.token);
  const { token } = req.user;
  res.send({ token })
})

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

// Static Files
app.use(express.static(path.resolve(__dirname, '../public')))
app.use('/public',express.static(path.join(__dirname, '../public')))
app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.use((err, req, res, next) => {
  console.log(err)
  res.status(err.status || 500).send({message : err.message})
})

const init = () => {
  return sync()
  .then(() => seed())
}

init()

module.exports = app

app.listen(port, () => console.log(`listening on port ${port}`))
