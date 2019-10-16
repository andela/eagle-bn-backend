'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Trips', {
      id: {allowNull: false,autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      departureTime: { type: Sequelize.DATE, allowNull: false },
      destination: { type: Sequelize.STRING, allowNull: false },
      reason: { type: Sequelize.TEXT,  allowNull: false },
      createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      RequestId: {
        type: 'integer',
        onDelete: 'CASCADE',
        allowNull: false,
        references: {
          model: 'Requests',
          key: 'id',
        },
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Trips');
  }
};
