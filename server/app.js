const express = require('express')
const path = require('path')
const passport = require('passport');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const { router, auth } = require('./api');
const { sync, seed } = require('./db/seed');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json())

// OAuth Middleware
auth(passport);
app.use(passport.initialize());

app.get('/auth/google', 
	passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile']
}));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure'
    }),
    (req, res) => {
        req.session.token = req.user.token;
        res.redirect('/');
    }
);

// Cookies for persistent login
app.use(cookieSession({
    name: 'session',
    keys: ['123']
}));

app.use(cookieParser());

app.get('/', (req, res) => {
    if (req.session.token) {
        res.cookie('token', req.session.token);
        res.json({
            status: 'session cookie set'
        });
    } else {
        res.cookie('token', '')
        res.json({
            status: 'session cookie not set'
        });
    }
});

app.get('/logout', (req, res) => {
    req.logout();
    req.session = null;
    res.redirect('/');
});

app.get('/', (req, res) => {
    res.json({
        status: 'session cookie not set'
    });
});

// Static Files
app.use('/public',express.static(path.join(__dirname, '../public')))
app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

// Routers
app.use('/api', router)


const init = () => {
  return sync()
  .then(() => seed())
}

init()

app.listen(port, () => console.log(`listening on port ${port}`))