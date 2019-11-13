'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Trips', 
  'departureTime', {
    type: 'timestamptz USING CAST("departureTime" as timestamptz)',
  });
 },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Trips', 'departureTime', );
 }
};