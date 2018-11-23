const expect = require('chai').expect
const app = require('../../app')
const supertest = require('supertest')(app)
const { sync } = require('../../db/') 
const User = require('../../db/Models/User')

describe('user-routes', () => {

  describe('/api/user/', () => {
    beforeEach(() => {
      return sync()
    });

    it('gets all users', async() => {
      return supertest
      .get('/api/user')
      .expect(200)
   })
  })  
})