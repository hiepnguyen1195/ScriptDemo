const config = {
  development: {
    username: 'root',
    password: 'root',
    database: 'graphql',
    host: '127.0.0.1',
    dialect: 'mysql',
    force: true,
  },
  test: {
    username: 'root',
    password: 'root',
    database: 'graphql_test',
    host: '127.0.0.1',
    dialect: 'mysql',
    force: true,
    logging: false,
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: 'mysql',
  },
}
export default config
