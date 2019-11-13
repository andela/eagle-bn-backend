'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Comments','parent',{
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Comments',
        key: 'id',
        onDelete: 'CASCADE'
      }
    },'')
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Comments','parent');
  }
};
