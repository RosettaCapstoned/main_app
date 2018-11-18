const expect = require('chai').expect
const { sync, seed } = require ('../server/db/seed')
const User = require ('../server/db/User')

describe('Database test to ensure User model works', () => {
  let data = {
    users: []
  }
  beforeEach(() => {
    return sync()
    .then(() => {
      return seed()
      .then((seed) => {
        data = seed
      })
    })
  })
  it('User model exists', () => {
    expect(User).to.be.ok;
  })
  it('expects all seeded data to exist', () => {
    expect(data.users.length).to.equal(6)
  })
  it('users can find their teacher', () => {
    return User.findOne({
      where: {
        firstName: 'Moe'
      }, 
      include: { model: User, as: 'teacher'}
    })
    .then(moe => {
      expect(moe.teacher.firstName).to.equal('Prof')
      expect(moe.students).to.equal(undefined)
    })
  })
  it('a teacher can find thier students', () => {
    return User.findOne({
      where: {
        firstName: 'Prof'
      },
      include: [{
        model: User, as: 'students'
      }]
    })
    .then(prof => {
      expect(prof.students.length).to.equal(4)
    })
  })
  it('A new student can be created and be assigned to a teacher and teacher can find new student', async () => {
    const prof = data.users.find(user => user.firstName === 'Prof')
    await User.create({
      firstName: 'Harry',
      lastName: 'Chen',
      email: 'harrychen@gmail.com',
      password: '1234',
      role: 'Student',
      teacherId: prof.id
    })
    const updatedProf = await User.findById(prof.id, {
      include: [
        { model : User, as: 'students' }
      ]
    })
    const harry = updatedProf.students.find(student => student.firstName === 'Harry')
      expect(harry.firstName).to.equal('Harry')
      expect(harry.teacherId).to.equal(prof.id)
      expect(updatedProf.students.length).to.equal(5)
  })
  it('a new teacher can be created and have students assigned to them', async () => {
    const pheyton = data.users.find((user) => !user.teacherId && user.role === 'Student')

    const newTeacher = await User.create({
      firstName: 'Eliot',
      lastName: '@FS',
      email: 'eliot@fs.com',
      password: '1234',
      role: 'Teacher'
    })
    await pheyton.update({ teacherId: newTeacher.id })
    const updatedTeacher = await User.findById(newTeacher.id, {
      include: [
        { model: User, as: 'students' } 
      ]
    })
    expect(updatedTeacher.firstName).to.equal('Eliot')
    expect(updatedTeacher.students.length).to.equal(1)
    expect(updatedTeacher.students[0].id).to.equal(pheyton.id)
  })
})
