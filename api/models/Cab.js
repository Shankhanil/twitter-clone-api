const Sequelize = require('sequelize');
// const bcryptService = require('../services/bcrypt.service');

const sequelize = require('../../config/database');

const hooks = {
  // beforeCreate(user) {
  // user.password = bcryptService().password(user); // eslint-disable-line no-param-reassign
  // },
};

const tableName = 'cabtable';
// const cabTableName = 'cabtable';

const Cab = sequelize.define('Cab', {
  userid: {
    type: Sequelize.STRING,
    // unique: true,
  },
  start: {
    type: Sequelize.STRING,
  },
  end: {
    type: Sequelize.STRING,
  },
}, { hooks, tableName });

// eslint-disable-next-line
Cab.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  // delete values.password;

  return values;
};

module.exports = Cab;

