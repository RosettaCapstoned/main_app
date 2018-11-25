const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../db/Models/User');
module.exports = router;

router.post('/signup', (req, res, next) => {
  const { firstName, lastName, password, email } = req.body
  User.create({
    firstName,
    lastName,
    password,
    email,
    role: 'Student'
  })
  .then(user => {
    res.send(user)
  })
  .catch(next)

})

router.post('/', (req, res, next) => {
  User.findOne({ 
    where: {
      email: req.body.email, 
      password: req.body.password
    } 
  })
  .then( user => {
    if (!user) {
      return next({ status: 401 })
    }
    const token = jwt.sign({ id: user.id }, 
                process.env.JWT_SECRET)
    console.log(token);
    res.send({ token })
  })
  .catch(next)
})

router.get('/', (req, res, next)=> {
  if (!req.user){
    return next({ status: 401 })
  }
  res.status(200).send(req.user);
})
