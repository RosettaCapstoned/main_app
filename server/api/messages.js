const express = require('express');
const router = express.Router();
const { Message } = require('../db');

router.get('/', (req, res, next) => {
	Message.findAll()
	.then(messages => {
		res.send(messages);
    }).catch(next);
});

router.post('/', (req, res, next) => {
  const { content, language } = req.body;
  Message.create({ content, language })
  .then(message => {
  	res.send(message)
  }).catch(next)
});

module.exports = router;
