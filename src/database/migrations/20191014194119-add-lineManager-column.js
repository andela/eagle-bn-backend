module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.addColumn(
        'Users',
        'lineManager',
        {
            type: Sequelize.INTEGER,
            defaultValue: 1
        }
      );
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn(
          'Users',
          'lineManager'
        );
      }
  }
  