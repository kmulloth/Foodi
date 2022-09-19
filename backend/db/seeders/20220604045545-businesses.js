'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Businesses', [
      {
        name: 'Halal Guys',
        imgUrl: 'https://fransmart.com/wp-content/uploads/2021/08/Screen-Shot-2021-08-19-at-2.44.33-PM.png',
        owner_id: 4,
        body: 'The Original! The classic mediterrenean flavors that became a NYC Institution. Now a nationwide phenomenon, come see where it all started at .',
        openTimes: "11:00,11:00,11:00,11:00,11:00,11:00,11:00",
        closeTimes: "22:00,22:00,22:00,22:00,22:00,22:00,22:00",
        location: '123 Main St, New York, NY 10001'
      },
      {
        name: 'The Baratie',
        imgUrl: 'https://sf.ezoiccdn.com/ezoimgfmt/i0.wp.com/fullcirclecinema.com/wp-content/uploads/2022/04/Untitled-design-2022-04-02T194115.896.png?ezimgfmt=ng%3Awebp%2Fngcb1%2Frs%3Adevice%2Frscb1-2&resize=900%2C500&ssl=1',
        owner_id: 2,
        body: 'The Baratie is a restaurant that specializes in the cuisine of the Sea. Only accessible by boat, we promise the meal at the Baratie will be as adventourous as your journey there.',
        openTimes: "11:00,11:00,11:00,11:00,11:00,11:00,11:00",
        closeTimes: "22:00,22:00,22:00,22:00,22:00,22:00,22:00",
        location: 'Pacific Ocean'
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Businesses', {
      name: { [Op.in]: ['Halal Guys', 'The Baratie'] }
    }, {});
  }
};
