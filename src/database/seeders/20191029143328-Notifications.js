'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.bulkInsert('Notifications', [{
      userId: 5,
      modelName: 'Requests',
      modelId: 1,
      type: 'new_request',
      isRead: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  ]),

  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.bulkDelete('Notifications', null, {})
  ])
};
