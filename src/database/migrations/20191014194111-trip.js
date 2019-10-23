'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Trips', {
      id: {allowNull: false,autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      departureTime: { type: Sequelize.STRING, allowNull: false },
      country: { type: Sequelize.STRING, allowNull: false },
      city: { type: Sequelize.STRING, allowNull: false },
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
      accommodationId: {
        type: 'integer',
        onDelete: 'CASCADE',
        allowNull: true,
        references: {
          model: 'Accommodations',
          key: 'id',
        },
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Trips');
  }
};
