'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Accommodations', {
      id: {allowNull: false,autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      userid: { type: 'integer', 
      onDelete: 'CASCADE',
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },},
      description: { type: Sequelize.STRING, allowNull: false, },
      address: { type: Sequelize.STRING, allowNull: false },
      availableSpace: { type: Sequelize.STRING, allowNull: false },
      cost: { type: Sequelize.DOUBLE, allowNull: false, },
      services: { type: Sequelize.STRING, allowNull: false },
      amenities: { type: Sequelize.STRING, allowNull: false },
      createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updatedAt: { allowNull: false, type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Accommodations',  {
      force: true,
      cascade: true,
  });
  }
};
