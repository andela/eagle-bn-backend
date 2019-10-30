'use strict';

var tomorrow = new Date();
tomorrow.setDate( tomorrow.getDate() + 1);
module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.bulkInsert('Bookings', [{
      UserId:3,
      AccommodationId: 1,
      start: new Date(),
      end: new Date(),
      TripId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }]),
    queryInterface.bulkInsert('Bookings', [{
        UserId:3,
        AccommodationId: 1,
        start: new Date(),
        end: new Date(),
        TripId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }]),
      queryInterface.bulkInsert('Bookings', [{
        UserId:3,
        AccommodationId: 1,
        start: tomorrow,
        end: tomorrow,
        TripId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }])
  ]),

  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.bulkDelete('Bookings', null, {})
  ])
};
