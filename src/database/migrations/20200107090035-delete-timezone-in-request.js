'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'Requests',
      'timeZone'
    );
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Requests',
      'timeZone',
     Sequelize.INTEGER
    );
  }
};
