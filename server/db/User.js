const Sequelize = require('sequelize')
const conn = require('./index')

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
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  role: {
    type: Sequelize.ENUM('Teacher', 'Student')
  },
  googleId: Sequelize.INTEGER
})

User.belongsTo(User, {as: 'teacher'})
User.hasMany(User,{as: 'students', foreignKey: 'teacherId'})

module.exports = User