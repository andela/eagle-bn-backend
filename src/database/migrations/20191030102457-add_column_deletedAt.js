'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Comments','deletedAt',{
      type: Sequelize.DATE,
      allowNull: true,
    },'')
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Comments','deletedAt');
  }
};
