'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'Bookings',
      'TripId'
    );

  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Bookings',
      'TripId',
     Sequelize.INTEGER
    );
  }
};
