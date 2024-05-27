'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id' },
      },
      business_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Businesses', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      value: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      body: {
        type: Sequelize.TEXT
      },
      img: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    },options);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Reviews'),options;
  }
};
