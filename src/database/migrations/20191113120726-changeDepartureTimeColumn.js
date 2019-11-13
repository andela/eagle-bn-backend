'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Trips', 
  'departureTime', {
    type: Sequelize.DATE,
  });
 },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Trips', 
    'departureTime', {
      type: Sequelize.DATE,
    });
 }
};