const Sequelize = require('sequelize');
const conn = require('../conn');
const { User } = require('../index')

const Room = conn.define('room', {
  name: {
    type: Sequelize.STRING
  },
  id: {
  	type: Sequelize.UUID,
  	defaultValue: Sequelize.UUIDV4,
  	primaryKey: true
  },
  languages: {
  	type: Sequelize.ARRAY(Sequelize.STRING),
  	allowNull: true
  },
  classTeacherId: Sequelize.UUID
},{
  include: [{
  	model: [User]
  }]
})

module.exports = Room