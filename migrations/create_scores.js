'use strict'
exports.up = function (knex, Promise) {
  return knex.schema.createTable('scores', function (table) {
    table.increments()
    table.string('name').notNullable()
    table.integer('score').notNullable()
    table.timestamps()
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('scores')
}