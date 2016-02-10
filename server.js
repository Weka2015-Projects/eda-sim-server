import koa from 'koa'
import Resource from 'koa-resource-router'
import koaBody from 'koa-better-body'
import knex from 'koa-knex'
import mount from 'koa-mount'
import path from 'path'
import cors from 'koa-cors'

const PORT = process.env.PORT || 4000
const app = module.exports = koa()
app.use(koaBody({
  extendTypes: {
    json: [ 'application/x-javascript' ],
  }
}))

app.use(knex({
  client: 'postgresql',
  connection: {
    database: 'eda_sim_dev'
  }
}))

const scores = new Resource('scores', {
  index: function *(next) {
    this.body =  yield { scores: this.knex('scores') }
  },
  create: function *(next) {
    try {
      const res = yield this.knex('scores').returning('*').insert({
        name: this.request.body.fields.score.name,
        score: this.request.body.fields.score.score,
        created_at: new Date(),
        updated_at: new Date()
      })
      this.type = 'application/json'
      this.status = 201
      this.set('Location', `/scores/${res[0].id}`)
      this.body = { scores: res[0] }
    } catch (e) {
      console.log('error', e)
      this.status = 422
    }
  },
  show: function *(next) {
    const id = this.params.score
    const res = yield this.knex.raw('SELECT * FROM SCORES WHERE ID = ?', [id])
    if (res.rows.length === 1) {
      this.body = { score: res.rows[0] }
    } else {
      this.status = 404
    }
  },
  update: function *(next) {
    const id = this.params.score
    const prevObj = yield this.knex.raw('SELECT * FROM SCORES WHERE ID = ?', [id]) 
    const res = yield this.knex('scores').returning('*').where('id', id).update({
        name: this.request.body.fields.score.name || prevObj.rows[0].name,
        score: this.request.body.fields.score.score || prevObj.rows[0].score,
        updated_at: new Date()
      })
    if (res) {
      this.body = { score: res[0] }
    } else {
      this.status = 404
    }
  },
  destroy: function *(next) {
    const id = this.params.score
    const res = yield this.knex('scores').returning('*').where('id', id).del()
    this.body = { message: `Deleted score with name of ${res[0].name} and id of ${id}` }
  }
})

app.use(mount('/api/v1', scores.middleware()))

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT} . . .`)
})

const options = {
    origin: '*',
    methods: ['GET', 'POST']
}

app.use(cors(options))
