// const ENDPOINT = 'http://localhost:2017';
const ENDPOINT = 'https://limitless-anchorage-71184.herokuapp.com/';
const development = {
  database: 'databasename',
  username: 'username',
  password: 'password',
  host: 'localhost',
  dialect: 'sqlite' || 'mysql' || 'postgres',
};

const testing = {
  database: 'databasename',
  username: 'username',
  password: 'password',
  host: 'localhost',
  dialect: 'sqlite' || 'mysql' || 'postgres',
};

const production = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST || 'localhost',
  dialect: 'sqlite' || 'mysql' || 'postgres',
};

module.exports = {
  ENDPOINT,
  development,
  testing,
  production,
};
