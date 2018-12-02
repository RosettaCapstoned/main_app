const conn = require('./conn');
const Room = require('./Models/Room');
const User = require('./Models/User');
const Message = require('./Models/Message');
const jwt = require('jwt-simple');


User.belongsTo(User, { as: 'teacher' });
User.hasMany(User, { as: 'students', foreignKey: 'teacherId' });

User.hasMany(Message);
Message.belongsTo(User);

Room.hasMany(Message);
Message.belongsTo(Room);

Room.hasMany(User)
Room.hasOne(User, { as: 'Teacher', foreignKey: 'classTeacherId' })
User.belongsTo(Room)

const sync = () => {
  return conn.sync({ force: true });
};

const seed = async () => {
  const data = {
    users: [],
    rooms: []
  };
  try {
    const [ moe, larry, curly, prof, mike, pheyton, room1, room2, message1, message2 ] = await Promise.all([
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
      Room.create(),
      Room.create(),
      Message.create({ content: 'This is a short', language: 'en'}),
      Message.create({ content: 'es mucho mucho mucho mucho grande grande simpatico message', language: 'es' })
    ])
    const englishRoom = await Room.create({ name: 'English' })
    await Promise.all([
          moe.update({ teacherId: prof.id, roomId: room1.id }),
          larry.update({ teacherId: prof.id, roomId: room1.id }),
          curly.update({ role: 'Teacher', roomId: englishRoom.id }),
          mike.update({ teacherId: prof.id, roomId: englishRoom.id }),
          prof.update({ roomId: englishRoom.id }),
          pheyton.update({ teacherId: prof.id, roomId: englishRoom.id }),
          room1.update({ classTeacherId: prof.id }),
          room2.update({ classTeacherId: moe.id}),
          message1.update({ userId: moe.id, roomId: room2.id }),
          message2.update({ userId: prof.id, roomId: room1.id})
        ])
      data.users = [moe, larry, curly, prof, mike, pheyton];
      data.rooms = [englishRoom, room1, room2]
      data.messages = [message1, message2]
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
    Room,
    Message
  },
};
