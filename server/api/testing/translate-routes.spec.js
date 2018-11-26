const expect = require('chai').expect
const app = require('../../app')
const supertest = require('supertest')(app)
const { sync, seed } = require('../../db/') 
// const User = require('../../db/Models/User')
//const translate = require('../')

describe('user-routes', () => {

  describe('/api/translate/', () => {
    // beforeEach(() => {
    //   return sync().then(()=> seed())
    // });

    it('GETs a response', () => {
      return supertest
      .get('/api/translate/')
      .expect(200)
   })

   it('POST has a response', () => {
    return supertest
    .post('/api/translate/')
    .expect(200)
 })

  it('POST takes a payload, consisting of message (string) and language (string)', ()=> {
    const englishMessage = 'hello blue sky';
    
    const languageFrom = 'en';
    const languageTo = 'es';
    const options = { to: languageTo, from: languageFrom }
    
    const spanishMessage = 'hola cielo azul';


    const payload = { 
      message: englishMessage, 
      options
    }
    
    return supertest
    .post('/api/translate/', payload )
    .expect(spanishMessage);
  })
  })  
})