'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.bulkInsert('Trips', [{
      RequestId: 1,
      reason: 'I just like that place',
      country: 'UG',
      city: 'Kampala',
      departureTime: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    },
  {
    RequestId: 1,
    country: 'KE',
    city: 'Nairobi',
    reason: 'I do not have any reason',
    departureTime: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    RequestId: 2,
    country: 'NG',
    city: 'lagos',
    reason: 'I do not have any reason',
    departureTime: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  },
])
  ]),
  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.bulkDelete('Trips', null, {})
  ])
};
