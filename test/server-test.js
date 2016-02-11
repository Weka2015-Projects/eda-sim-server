require ('co-mocha')
const app = require('../server.js')
const request = require('co-supertest').agent(app.listen())
const expect = require('chai').expect
const knex = require('knex')({
  client: 'pg',
  connection: {
    database : 'eda_sim_test'
  }
});

describe('Testing POST', () => {
   describe('POST /api/v1/scores', () => {
    before(()=> knex.select().from('scores').del())
    after(()=> knex.select().from('scores').del())
    it('returns 201 created if it the POST is valid', function *() {
      yield request.post('/api/v1/scores')
      .send({ score:{name: "katie", score: 2330}}).expect(201).end()
    })
    it('Increases the length of the scores array by one', function *() {
      const x = yield knex.select('name').from('scores')
      expect(x.length).to.equal(1)
    })
    it('Returns 422 unprocessable entity if POST is invalid', function *() {
      yield request.post('/api/v1/scores')
      .send({ score:{name: "colin"}}).expect(422).end()
    })
    it('does not increase the length of scores array if POST is invalid', function *() {
      const x = yield knex.select('name').from('scores')
      expect(x.length).to.equal(1)
    })
  })
})

describe('Testing GET', () => {
  before(function *() {
      yield knex.select().from('scores').del()
      yield request.post('/api/v1/scores').send({ score:{name: "irene", score: 2323}}).expect(201).end()
  })
  after(()=> knex.select().from('scores').del())
  describe('GET /api/v1/scores', () => {
    it('returns 200 OK if it the GET is valid', function *() {
      yield request.get('/api/v1/scores').expect(200).end()
    })
    it('corrrectly returns the length of the array', function *() {
      const x = yield request.get('/api/v1/scores')
      const scores = x.res.body.scores
      expect(scores.length).to.equal(1)
    })
    it('Returns 404 Not Found if GET is invalid', function *() {
      yield request.get('/api/v1/notfound').expect(404).end()
    })
  })
  describe('GET /api/v1/scores/:id', () => {
    xit('returns 200 OK if it the GET is valid', function *() {
      yield request.get('/api/v1/scores/id').expect(200).end()
    })
    xit('correctly returns the length of the array', function *() {
      const x = yield knex.select('name').from('scores')
      expect(x.length).to.equal(1)
    })
    it('Returns 404 unprocessable entity if GET is invalid', function *() {
      yield request.get('/api/v1/scores/-1').expect(404).end()
    })
  })
})