const router = require('express').Router()
const auth = require('./auth');

router.use('/users', require('./user.js'))

module.exports = { router, auth };