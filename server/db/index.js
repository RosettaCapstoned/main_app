const conn = require('./conn');
const User = require('./Models/User');
const jwt = require('jwt-simple');

User.belongsTo(User, { as: 'teacher' });
User.hasMany(User, { as: 'students', foreignKey: 'teacherId' });

const sync = () => {
  return conn.sync({ force: true });
};

const seed = () => {
  const data = {
    users: [],
  };
  return Promise.all([
    User.create({
      firstName: 'Moe',
      lastName: 'Moe',
      email: 'moe@moe.com',
      password: jwt.encode('moe', process.env.JWT_SECRET),
      role: 'Student',
    }),
    User.create({
      firstName: 'Larry',
      lastName: 'Larry',
      email: 'larry@larry.com',
      password: jwt.encode('larry', process.env.JWT_SECRET),
      role: 'Student',
    }),
    User.create({
      firstName: 'Curly',
      lastName: 'Curly',
      email: 'curly@curly.com',
      password: jwt.encode('curly', process.env.JWT_SECRET),
      role: 'Student',
    }),
    User.create({
      firstName: 'Prof',
      lastName: 'McProf',
      email: 'prof@prof.com',
      password: jwt.encode('prof', process.env.JWT_SECRET),
      role: 'Teacher',
    }),
    User.create({
      firstName: 'Mike',
      lastName: 'McMike',
      email: 'mike@moe.com',
      password: jwt.encode('mike', process.env.JWT_SECRET),
      role: 'Student',
    }),
    User.create({
      firstName: 'Pheyton',
      lastName: 'Turnip',
      email: 'pheyton@turnip.com',
      password: jwt.encode('pheyton', process.env.JWT_SECRET),
      role: 'Student',
    }),
  ])
    .then(([moe, larry, curly, prof, mike, pheyton]) => {
      return Promise.all([
        moe.update({ teacherId: prof.id }),
        larry.update({ teacherId: prof.id }),
        curly.update({ teacherId: prof.id }),
        mike.update({ teacherId: prof.id }),
        prof.update({}),
        pheyton.update({}),
      ]);
    })
    .then(([moe, larry, curly, mike, prof, pheyton]) => {
      data.users = [moe, larry, curly, prof, mike, pheyton];
      return data;
    });
};

module.exports = {
  sync,
  seed,
  models: {
    User,
  },
};
