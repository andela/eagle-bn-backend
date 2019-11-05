'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.bulkInsert('Likings', [{
      userId: 1,
      accommodationId: 1,
      isLiked: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  ]),

  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.bulkDelete('Likings', null, {})
  ])
};
