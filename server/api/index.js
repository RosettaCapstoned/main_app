const userRouter = require('./user');
const auth = require('./auth');
const authenticate = auth.authenticate

module.exports = { userRouter, authenticate };