'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
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
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
