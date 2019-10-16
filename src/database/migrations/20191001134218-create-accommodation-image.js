'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('AccommodationImages', {
      id: {allowNull: false,autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      accommodationid: { type: 'integer', 
      onDelete: 'CASCADE',
      allowNull: false,
      references: {
        model: 'Accommodations',
        key: 'id',
      },},
      imageurl: { type: Sequelize.STRING, allowNull: false, },
      createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updatedAt: { allowNull: false, type: Sequelize.DATE},
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('AccommodationImages');
  }
};
