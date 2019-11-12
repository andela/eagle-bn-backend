'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.bulkInsert('Requests', [{ // two-way trip
      UserId: 3,
      country: 'RW',
      city: 'kigali-ngali',
      timeZone: 'africa/kigali',
      returnTime: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    },
  { // one-way trip
    UserId: 3,
    country: 'RW',
    city: 'kigali-ngali',
    timeZone: 'africa/kigali',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  { // one-way trip
    UserId: 3,
    country: 'RW',
    city: 'kigali-ngali',
    timeZone: 'africa/kigali',
    createdAt: new Date(),
    updatedAt: new Date()
  }])
  ]),
  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.bulkDelete('Requests', null, {})
  ])
};

