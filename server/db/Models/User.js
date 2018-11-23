const Sequelize = require('sequelize')
const conn = require('../conn')

const User = conn.define('user', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: true
  },
  role: {
    type: Sequelize.ENUM('Teacher', 'Student')
  },
  googleId: Sequelize.STRING
})

module.exports = User