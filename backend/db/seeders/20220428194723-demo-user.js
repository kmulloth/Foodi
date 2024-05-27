'use strict';
const bcrypt = require('bcryptjs');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: (queryInterface, Sequelize) => {

    options.tableName = 'Users'
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Zeff@Baratie.io',
        username: 'ChefZeff',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Sanji@Baratie.io',
        username: 'Sanji',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'halal@guys.com',
        username: 'TheHalalGuys',
        hashedPassword: bcrypt.hashSync('password')
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    options.tableName = 'Users'
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
