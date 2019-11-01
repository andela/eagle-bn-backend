'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Users','recieveEmails',{
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },'')
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users','recieveEmails');
  }
};
