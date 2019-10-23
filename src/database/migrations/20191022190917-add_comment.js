'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Comments',{
      id: {allowNull: false,autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      comment: {type:Sequelize.STRING, allowNull:false},
      userId: {
        type: 'integer',
        allowNull: true,
        defaultValue: 0,
        references: {
          model: 'Users',
          key: 'id',
          onDelete: 'SET NULL'
        }
      },
      requestId: {
        type: 'integer',
        allowNull: true,
        defaultValue: 0,
        references: {
          model: 'Requests',
          key: 'id',
          onDelete: 'SET NULL'
        }
      },
      createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Comments');
  }
};
