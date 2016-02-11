exports.seed = function(knex, Promise) {
  return Promise.join(
   knex('scores').del(),
   knex('scores').insert([
   {
    name: 'aaronmrobb',
    score: 200,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'katie',
    score: 400,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'falloutboy',
    score: 9001,
    created_at: new Date(),
    updated_at: new Date()
  }]))
 }