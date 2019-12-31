'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Notifications','description',{
      type: Sequelize.STRING,
      allowNull: true,
    },'')
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Notifications','description');
  }
};
