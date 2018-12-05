const express = require('express');
const path = require('path');
const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20');
const { User, Room } = require('./db/').models;
// const googleKey = require('./env');

const googleKey = {};
const cookieSession = require('cookie-session');
const { userRouter, authRouter, translateRouter, roomRouter, messagesRouter } = require('./api');
const { sync, seed } = require('./db/');
const app = express();
const port = process.env.PORT || 3000;
const secret = process.env.JWT_SECRET || 'rosetta';
const jwt = require('jsonwebtoken');

//Translation API
const translate = require('translate');
translate.engine = 'google';
translate.key = googleKey.apiKey || process.env.apiKey 

//Wrapping server in socket.io instance
const server = require('http').Server(app);
const io = require('socket.io')(server);

const room = 'default';

//Temporary UUID for messageId, eventually done in Postgres
const uuidv1 = require('uuid/v1');
let payload;

//Socket.io implementation
io.on('connection', socket => {
  socket.join(room);
  let languages = new Set(['zh', 'fr', 'es', 'ru']);
  const { id } = socket;
  console.log('user joined: ', id);

  ////Client may need to update the User instance to know socketID
  socket.emit('socketId', id);

  //Receive Room ID and Language from Client,
  // - join socket to room
  // - find teacher and language from room
  // - send teacherId to client

  socket.on('roomSettings', ({ lng }) => {
    console.log('room setting event: ', lng);
    // Rooms.findById(roomId)
    //  .then(_room => { 'use code below'
    //  _room.languages.forEach(_lng => languages.add(_lng));
    //})
    languages.add(lng);
    console.log(`${socket.id} joined: ${room}`);
  });

  //Action broadcasts to all clients attached, not including the current client
  io.to(room).emit('joined', { message: 'a user joined' });

  socket.on('joinChat', language => {
    currentLanguages[socket.id] = language;
    console.log('current languages is: ', currentLanguages);
  });
  //Needs to establish user settings from client
  // - Send user payload, containing:
  // -- Room
  // -- Language
  // -- Teacher

  //Action listener for 'message' action
  socket.on('message', _message => {
    const { name, message, languageSetting } = _message;
    const { from } = languageSetting;

    return Promise.all(
      Array.from(languages).map(_lng => {
        console.log('language is: ', _lng);
        return translate(message, { to: _lng, from });
      })
    )
      .then(translations => {
        let payload = {},
          idx = 0;
        languages.forEach(_lng => {
          payload[_lng] = translations[idx];
          idx++;
        });

        const translatedMessage = {
          name,
          message: payload,
        };
        io.to(room).emit('message', translatedMessage);
      })
      .catch(err => console.error(err));
  });

  socket.on('teacherSpeech', speechText => {
    //Teachers message
    //console.log(speechText);
    const { name, message, languageSetting } = speechText;
    const { from } = languageSetting;
    return Promise.all(
      Array.from(languages).map(_lng => {
        //console.log('language is: ', _lng);
        return translate(message, { to: _lng, from });
      })
    )
      .then(translations => {
        let payload = {},
          idx = 0;
        languages.forEach(_lng => {
          payload[_lng] = translations[idx];
          idx++;
        });
        const translatedMessage = {
          name,
          message: payload,
        };
        io.to(room).emit('teacherSpeech', translatedMessage);
      })
      .catch(err => console.error(err));
  });

  socket.on('teacherStreamId', payload => {
    const { teacherStreamId } = payload
    console.log('TEACHER ID', teacherStreamId)
    // return Room.findByPk(roomId)
    // .then(room => room.update({ teacherStreamId }))
    // .then(() => socket.broadcast.emit('teacher-stream', teacherStreamId))
    socket.broadcast.emit('teacher-stream', teacherStreamId)
  })
  socket.on('studentStreamId', payload => {
    const { studentStreamId } = payload
    console.log('STUDENT ID', studentStreamId)
    socket.broadcast.emit('student-stream', studentStreamId)
  })

  //Action listener for 'disconnection' action
  socket.on('disconnect', () => {
    io.emit('message', { message: 'a user signed off' });
    console.log('Goodbye, ', socket.id, ' :(');
  });
});

const bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware
// app.use(express.json())
app.use(
  cookieSession({
    name: 'session',
    keys: ['123'],
  })
);

// JWT Token Auth Middleware
app.use((req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return next();
  }
  let id;
  try {
    id = jwt.decode(token, secret).id;
    User.findByPk(id, {
      include: { model: Room }
    })
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
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/translate', translateRouter);
app.use('/api/room', roomRouter);
app.use('/api/messages', messagesRouter);

// OAuth Middleware
app.use(passport.initialize()); // Used to initialize passport
app.use(passport.session()); // Used to persist login sessions

// Strategy config
passport.use(
  new GoogleStrategy(
    {
      clientID: '473333584039-2hnkf7ru65437gvu0lhu7qjjee2tr2b0.apps.googleusercontent.com',//googleKey.clientID || process.env.clientID,
      clientSecret: 'UrJoGhevrm7hTIKAuKsjXWI9',//googleKey.clientSecret || process.env.clientSecret,
      callbackURL: "http://localhost:3000/auth/google/callback",//googleKey.callbackURL || process.env.callbackURL,
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      const user = await User.findOrCreate({
        where: {
          googleId: profile.id,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          role: 'Student',
        },
      }).then(user => {
        user = { ...user, token: accessToken };
        done(null, user);
      });
    }
  )
);

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
  } else {
    res.send('You must login!');
  }
}

app.get('/oauth', (req, res) => {
  res.send({ user: req.user });
});

app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile'],
  })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/secret');
  }
);

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
app.use(express.static(path.resolve(__dirname, '../public')));
app.use('/public', express.static(path.join(__dirname, '../public')));
app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).send({ message: err.message });
});

const init = () => {
  return sync().then(() => seed());
};

init();

module.exports = app;

server.listen(port, () => console.log(`listening on port ${port}`));
