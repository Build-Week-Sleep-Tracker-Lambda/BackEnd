// Update with your config settings.
const env = require('dotenv');
env.config();

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/sleeptracker.db3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },
  testing: {
    client: 'sqlite3',
    connection: {
      filename: './data/test.db3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },
  production: {
    client: 'pg',
    connection:`${process.env.DATABASE_URL}?ssl=1`,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds',
    }
  }
};