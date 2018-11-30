const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const jwt2 = require('jwt-simple');
const User = require('../db/Models/User');
module.exports = router;

router.post('/signup', (req, res, next) => {
  const { firstName, lastName, password, email } = req.body;
  const signedPassword = jwt2.encode(password, process.env.JWT_SECRET);
  User.create({
    firstName,
    lastName,
    email,
    role: 'Student',
    password: signedPassword,
  })
    .then(user => {
      res.send(user);
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
  const signedPassword = jwt2.encode(req.body.password, process.env.JWT_SECRET);
  User.findOne({
    where: {
      email: req.body.email,
      password: signedPassword,
    },
  })
    .then(user => {
      if (!user) {
        return next({ status: 401 });
      }
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
      res.send({ token });
    })
    .catch(next);
});

router.get('/', (req, res, next) => {
  if (!req.user) {
    return next({ status: 401 });
  }
  res.status(200).send(req.user);
});
