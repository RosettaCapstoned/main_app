const router = require('express').Router()
const User = require('../db/Models/User')

/*
  route: /api/users/ 
*/

//finds all students with a specific teacherId
router.get('/students/:teacherId', (req, res, next) => {
  User.findAll({
    where: {
      teacherId: req.params.teacherId
    }
  })
  .then(students => {
    res.send(students)
  })
  .catch(next)
})

//finds all students
router.get('/students', (req, res, next) => {
  User.findAll({
    where: {
      role: 'Student'
    }
  })
  .then(students => {
    res.send(students)
  })
  .catch(next)
})

//find all teachers
router.get('/teachers', (req, res, next) => {
  console.log('sd')
  User.findAll({
    where: {
      role: 'Teacher'
    }
  })
  .then(teachers => res.send(teachers))
  .catch(next)
})

//specific for reassigning a student's teacher
router.put('/:id/:teacherId', (req, res, next) => {
  User.findByPk(req.params.id)
  .then(student => student.update({ teacherId: req.params.teacherId }))
  .then(updated => res.send(updated))
  .catch(next)
})

//updates a user's information
router.put('/:id', (req, res, next) => {
  User.findByPk(req.params.id)
  .then(user => user.update(req.body))
  .then(updated => res.send(updated))
  .catch(next)
})

//delete a specific user 
router.delete('/:id', (req, res, next) => {
  User.findByPk(req.params.id)
  .then(user => user.destroy())
  .then(() => res.sendStatus(202))
  .catch(next)
})

//find a specific user
router.get('/:id', (req, res, next) => {
  User.findByPk(req.params.id)
  .then(user => res.send(user))
  .catch(next)
})



//get all users on platform
router.get('/', (req, res, next) => {
  User.findAll()
  .then(users => {
    res.send(users)
  })
  .catch(next)
})

module.exports = router