'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Accommodations','currency',{
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'USD',
    },'')
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Accommodations','currency');
  }
};
