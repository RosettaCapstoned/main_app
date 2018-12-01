const userRouter = require('./user');
const authRouter = require('./auth');
const translateRouter = require('./translate')
const roomRouter = require('./room');
const messagesRouter = require('./messages');


module.exports = { 
	userRouter, 
	authRouter, 
	translateRouter,
	roomRouter,
	messagesRouter
	};