const Sequelize = require('sequelize');
const conn = require('../conn');

const Message = conn.define('message', {
  content: {
  	type: Sequelize.TEXT,
  	allowNull: true
  },
  language: {
  	type: Sequelize.STRING
  },
  id: {
  	type: Sequelize.UUID,
  	defaultValue: Sequelize.UUIDV4,
  	primaryKey: true
  }
});

module.exports = Message;