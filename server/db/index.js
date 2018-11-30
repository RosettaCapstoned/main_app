const conn = require('./conn');
const Room = require('./Models/Room')
const User = require('./Models/User');
const jwt = require('jwt-simple');

User.belongsTo(Room)
Room.hasMany(User)

User.belongsTo(User, { as: 'teacher' });
User.hasMany(User, { as: 'students', foreignKey: 'teacherId' });

User.belongsTo(Room)
Room.hasMany(User)

const sync = () => {
  return conn.sync({ force: true });
};

const seed = async () => {
  const data = {
    users: [],
    rooms: []
  };
  try {
    const [moe, larry, curly, prof, mike, pheyton] = await Promise.all([
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
    const englishRoom = await Room.create({ name: 'English' })
    await Promise.all([
          moe.update({ teacherId: prof.id, roomId: englishRoom.id }),
          larry.update({ teacherId: prof.id, roomId: englishRoom.id }),
          curly.update({ teacherId: prof.id, roomId: englishRoom.id }),
          mike.update({ teacherId: prof.id, roomId: englishRoom.id }),
          prof.update({ roomId: englishRoom.id }),
          pheyton.update({ teacherId: prof.id, roomId: englishRoom.id })
        ])
      data.users = [moe, larry, curly, prof, mike, pheyton];
      data.rooms = [englishRoom]
      return data
  } catch (err) {
    console.log(err)
  }
  
};

module.exports = {
  sync,
  seed,
  models: {
    User,
  },
};
