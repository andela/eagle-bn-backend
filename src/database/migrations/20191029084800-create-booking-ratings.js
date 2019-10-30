'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Ratings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      BookingId: { type: 'integer', 
      allowNull: false,
      references: {
        model: 'Bookings',
        key: 'id',
      },},
      feedback: {
        type: Sequelize.STRING
      },
      rating: {
        allowNull: false,
        type: Sequelize.INTEGER,
        validate: {
          min:0,
          max:5
        },
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
    return queryInterface.dropTable('Ratings');
  }
};
