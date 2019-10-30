'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: { type: 'integer', 
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
      },},
      AccommodationId: { type: 'integer', 
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Accommodations',
        key: 'id',
      },},
      TripId: { type: 'integer', 
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Trips',
        key: 'id',
      },},
      start: {
        allowNull: false,
        type: Sequelize.DATE
      },
      end: {
        allowNull: false,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Bookings');
  }
};
