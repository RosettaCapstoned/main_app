const conn = require('./conn')
const User = require('./Models/User')

User.belongsTo(User, {as: 'teacher'})
User.hasMany(User,{as: 'students', foreignKey: 'teacherId'})

const sync = () => {
  return conn.sync({force: true})
}

const seed = () => {
  const data = {
    users: []
  }
  return Promise.all([
    User.create({firstName: 'Moe', lastName: 'Moe', email: 'moe@moe.com', password: 'moe', role: 'Student'}),
    User.create({firstName: 'Larry', lastName: 'Larry', email: 'larry@larry.com', password: 'larry', role: 'Student'}),
    User.create({firstName: 'Curly', lastName: 'Curly', email: 'curly@curly.com', password: 'curly', role: 'Student'}),
    User.create({firstName: 'Prof', lastName: 'McProf', email: 'prof@prof.com', password: 'prof', role: 'Teacher'}),
    User.create({firstName: 'Mike', lastName: 'McMike', email: 'mike@moe.com', password: 'mike', role: 'Student'}),
    User.create({firstName: 'Pheyton', lastName: 'Turnip', email: 'pheyton@turnip.com', password: 'pheyton', role: 'Student'}),
  ])
  .then(([moe, larry, curly, prof, mike, pheyton]) => {
    return Promise.all([
      moe.update({teacherId: prof.id}),
      larry.update({teacherId: prof.id}),
      curly.update({teacherId: prof.id}),
      mike.update({teacherId: prof.id}),
      prof.update({}),
      pheyton.update({})
    ])
  })
  .then(([moe, larry, curly, mike, prof, pheyton]) => {
    data.users = [moe, larry, curly, prof, mike, pheyton]
    return data
  })
}

module.exports = {
  sync, 
  seed,
  models: {
    User
  }
}