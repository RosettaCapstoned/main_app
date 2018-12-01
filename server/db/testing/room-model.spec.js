const expect = require('chai').expect;
const { sync } = require('../index');
const { Room, User } = require('../index').models;

describe('Room model', () => {
  beforeEach(() => {
  	return sync({ force: true })
  });

  it('has a unique id', async() => {
    const [ room1, room2, room3 ] = await Promise.all([
        Room.create(), Room.create(), Room.create()
      ]);
    expect(room1.id).to.not.equal(room2.id);
    expect(room2.id).to.not.equal(room3.id);
  });

  it('has many students', async () => {
    const commonRoom = await Room.create();
    const id = commonRoom.id;
    const [ student1, student2, student3 ] = await Promise.all([
      User.create({ firstName: 'kaz', lastName: 'k', role: 'Student', roomId: id }),
      User.create({ firstName: 'daniel', lastName: 's', role: 'Student', roomId: id }),
      User.create({ firstName: 'harry', lastName: 'c', role: 'Student', roomId: id })
    ]);
    await commonRoom.setUsers([student1, student2, student3])
    expect(student3.roomId).to.equal(commonRoom.id);
    expect(student2.roomId).to.equal(commonRoom.id);
    expect(student1.roomId).to.equal(commonRoom.id);
  });

  it('can add a name, but not necessary', async() => {
    const room1 = await Room.create();
    const room2 = await Room.create({ name: 'Cool Room'});
    expect(room1).to.be.ok;
    expect(room2).to.be.ok;
    expect(room2.name).to.equal("Cool Room");
  });

  it('has one teacher, by one user id', async () => {
    const teacher = await User.create({ firstName: 'eric', lastName: 'katz', role: 'Teacher'});
    const room1 = await Room.create({ teacherId: teacher.id});
    const rooms = await Room.findAll({
      include: [{model: User, as: 'Teacher'}]
    })
    expect(room1.teacherId).to.equal(teacher.id)
  });

})