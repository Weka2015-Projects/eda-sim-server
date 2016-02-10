module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'eda_sim_dev',
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './seeds/dev'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'eda_sim_staging',
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './seeds/stage'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'eda_sim_pro',
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './seeds/pro'
    }
  }

};