module.exports =  {
  development: {
    client: 'pg',
    connection: {
      database: 'eda_sim_dev',
    },
    pool: {
      min: 2,
      max: 10
    },
    seeds: {
      directory: './seeds/dev'
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  production: {
    client: 'pg',
    connection: {
      host: process.env.DBHOST,
      database: process.env.DBNAME,
      user:     process.env.DBUSER,
      password: process.env.DBPASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
}