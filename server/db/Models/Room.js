const Sequelize = require('sequelize')
const conn = require('../conn')

const Room = conn.define('room', {
  name: {
    type: Sequelize.STRING
  }
})

module.exports = Room