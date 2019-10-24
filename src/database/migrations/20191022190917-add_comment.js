'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Comments',{
      id: {
        allowNull: false,
        autoIncrement: true, 
        primaryKey: true, 
        type: Sequelize.INTEGER 
      },
      comment: {
        type:Sequelize.STRING, 
        allowNull:false
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        references: {
          model: 'Users',
          key: 'id',
        }
      },
      requestId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        references: {
          model: 'Requests',
          key: 'id',
        }
      },
      createdAt: { 
        allowNull: false, 
        type: Sequelize.DATE, 
        defaultValue: Sequelize.NOW 
      },
      updatedAt: { 
        allowNull: false, 
        type: Sequelize.DATE, 
        defaultValue: Sequelize.NOW 
      },
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Comments');
  }
};
