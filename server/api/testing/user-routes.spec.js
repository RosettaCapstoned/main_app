const expect = require('chai').expect
const app = require('../../app')
const supertest = require('supertest')(app)
const { sync } = require('../../db/') 
const User = require('../../db/Models/User')

describe('user-routes', () => {
  before(() => {
    return sync()
  })
  describe('/api/user/', () => {
    it('gets all users', async() => {
      return supertest
      .get('/api/user')
      .expect(200)
   })
  })  
})