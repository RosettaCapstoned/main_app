const express = require('express');
const router = express.Router();
const { Room } = require('../db');

router.get('/', (req, res, next) => {
	Room.findAll()
	.then(rooms => {
		res.send(rooms);
    }).catch(next);
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try{
	const room = await Room
	  .findOne({
		where: {id},
		include: [User]
	  });
	  res.send(room);
  } catch(ex) {console.log(ex)}
});

router.post('/', (req, res, next) => {
  req.body.name ? 
  Room.create({ name: req.body.name }) :
  Room.create()
  .then(room => {
  	res.send(room)
  }).catch(next)
});

module.exports = router;