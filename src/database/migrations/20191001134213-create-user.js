'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: { allowNull: false,autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      username: { type: Sequelize.STRING,  allowNull: false, },
      password: { type: Sequelize.STRING, allowNull: true, },
      email: { type: Sequelize.STRING, allowNull: false, unique: true, },
      isverified: { type: Sequelize.BOOLEAN, allowNull: true, defaultValue: false },
      role: { type: Sequelize.STRING, allowNull: true, },
      createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users', {
      force: true,
      cascade: true,
  });
  }
};
