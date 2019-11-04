`use strict`;

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Accommodations',
      'isAvailable',
      {
          type: Sequelize.BOOLEAN,
          defaultValue: true
      }
    );
  },
  down: function(queryInterface, Sequelize) {
      return queryInterface.removeColumn(
        'Accommodations',
        'isAvailable'
      );
    }
};
