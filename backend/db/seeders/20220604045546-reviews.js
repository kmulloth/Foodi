'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Reviews', [
      {
        user_id: 2,
        business_id: 1,
        value: 5,
        body: 'The only reason to venture onto land!',
        img: 'https://assets.simpleviewinc.com/simpleview/image/fetch/c_limit,q_75,w_1200/https://assets.simpleviewinc.com/simpleview/image/upload/crm/houston/halal-guys-dfd23e9bf8d04cd_dfd23f82-c8b0-18d3-c76189ec903e51cc.jpg'
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Reviews', {
      user_id: { [Op.in]: [2] }
    }, {});
  }
};
