'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Chats','parentId',{
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Chats',
        key: 'id',
        }
    },'')
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Chats','parentId');
  }
};
