'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = 'Business'
    return queryInterface.bulkInsert(options, [
      {
        name: 'Halal Guys',
        imgUrl: 'https://fransmart.com/wp-content/uploads/2021/08/Screen-Shot-2021-08-19-at-2.44.33-PM.png',
        owner_id: 4,
        body: 'The Original! The classic mediterrenean flavors that became a NYC Institution. Now a nationwide phenomenon, come see where it all started at .',
        openTimes: "11:00,11:00,11:00,11:00,11:00,11:00,11:00",
        closeTimes: "22:00,22:00,22:00,22:00,22:00,22:00,22:00",
        lat: 40.732226415967354,
        lng: -73.98449300773979,
        location: '123 Main St, New York, NY 10001',
        type: 'truck',
        cusine: 'Mediterranean'
      },
      {
        name: 'The Baratie',
        imgUrl: 'https://sf.ezoiccdn.com/ezoimgfmt/i0.wp.com/fullcirclecinema.com/wp-content/uploads/2022/04/Untitled-design-2022-04-02T194115.896.png?ezimgfmt=ng%3Awebp%2Fngcb1%2Frs%3Adevice%2Frscb1-2&resize=900%2C500&ssl=1',
        owner_id: 2,
        body: 'The Baratie is a restaurant that specializes in the cuisine of the Sea. Only accessible by boat, we promise the meal at the Baratie will be as adventourous as your journey there.',
        openTimes: "11:00,11:00,11:00,11:00,11:00,11:00,11:00",
        closeTimes: "22:00,22:00,22:00,22:00,22:00,22:00,22:00",
        lat: 39.47274385667352,
        lng: -70.84439555003725,
        location: 'Pacific Ocean',
        type: 'truck',
        cusine: 'American'
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    options.tableName = 'Business'
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Halal Guys', 'The Baratie'] }
    }, {});
  }
};
