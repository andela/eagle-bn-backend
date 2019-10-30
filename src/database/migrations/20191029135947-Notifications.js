'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Notifications', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      modelName: { type: Sequelize.STRING, allowNull: false },
      modelId: { type: Sequelize.INTEGER, allowNull: false },
      type: { type: Sequelize.STRING, allowNull: false },
      isRead: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
      userId: {
        type: 'integer',
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Notifications');
  }
};
