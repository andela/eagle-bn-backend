'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Chats','AccommodationId',{
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Accommodations',
        key: 'id',
        }
    },'')
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Chats','AccommodationId');
  }
};
