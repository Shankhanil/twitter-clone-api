const Sequelize = require('sequelize');
const bcryptService = require('../services/bcrypt.service');

const sequelize = require('../../config/database');

const tableName = 'tweets';

const Tweet = sequelize.define('Tweet', {
  userid: {
    type: Sequelize.STRING,
  },
  tweet: {
    type: Sequelize.STRING,
  },
  parent: {
	type: Sequelize.STRING,
  }
}, { tableName });

// eslint-disable-next-line
Tweet.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  // delete values.password;

  return values;
};


module.exports = Tweet;

