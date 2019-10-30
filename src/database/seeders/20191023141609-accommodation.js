'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.bulkInsert('Accommodations', [{
      userid:1,
      name: 'hotel',
      description: 'the first hotel in region',
      address: 'kigali',
      availableSpace: 'rooms and pool',
      cost: '200000',
      services: 'wifi, breakfast',
      amenities: '',
      isAvailable: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }]),
    queryInterface.bulkInsert('Accommodations', [{
      userid:1,
      name: 'hotel',
      description: 'the first hotel in region',
      address: 'kigali',
      availableSpace: 'rooms and pool',
      cost: '200000',
      services: 'wifi, breakfast',
      amenities: '',
      isAvailable: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }]),
    queryInterface.bulkInsert('Accommodations', [{
      userid:1,
      name: 'hotel',
      description: 'the first hotel in region',
      address: 'kigali',
      availableSpace: 'rooms and pool',
      cost: '200000',
      services: 'wifi, breakfast',
      amenities: '',
      isAvailable: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  ]),

  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.bulkDelete('Accommodations', null, {})
  ])
};
