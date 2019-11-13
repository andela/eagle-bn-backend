'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Requests', 
  'returnTime', {
    type: 'timestamptz USING CAST("returnTime" as timestamptz)',
  });
 },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Requests', 'returnTime', );
 }
};