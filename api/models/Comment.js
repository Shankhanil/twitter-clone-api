const Sequelize = require('sequelize');
const bcryptService = require('../services/bcrypt.service');

const sequelize = require('../../config/database');

const tableName = 'comments';

const Comment = sequelize.define('Comment', {
  userid: {
    type: Sequelize.STRING,
  },
  tweetid: {
    type: Sequelize.STRING,
  },
  comment: {
	  type: Sequelize.STRING,
  }
}, { tableName });

// eslint-disable-next-line
Comment.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  // delete values.password;

  return values;
};


module.exports = Comment;

