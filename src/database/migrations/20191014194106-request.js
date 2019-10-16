'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Requests', {
      id: { allowNull: false,autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      returnTime: { type: Sequelize.DATE },
      address: { type: Sequelize.STRING, allowNull: false },
      status: { type: Sequelize.STRING,  defaultValue: 'pending' },
      createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      UserId: {
        type: 'integer',
        onDelete: 'CASCADE',
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Requests');
  }
};
