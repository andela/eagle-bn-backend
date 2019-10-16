'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,autoIncrement: true,
         primaryKey: true, type: Sequelize.INTEGER 
        },
      username: { 
        type: Sequelize.STRING,
          allowNull: false, 
        },
      password: { 
        type: Sequelize.STRING,
         allowNull: true,
       },
      email: { 
        type: Sequelize.STRING, 
        allowNull: false, 
        unique: true, },
      role: {
        type: Sequelize.STRING,
        allowNull: true, 
      },
      isverified: { 
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false 
      },
      phone: {
        allowNull: true,
        type: Sequelize.STRING
      },
      gender: {
        allowNull: true,
        type: Sequelize.STRING
      },
      dob: {
        allowNull: true,
        type: Sequelize.DATE
      },
      address: {
        allowNull: true,
        type: Sequelize.STRING
      },
      city: {
        allowNull: true,
        type: Sequelize.STRING
      },
      state: {
        allowNull: true,
        type: Sequelize.STRING
      },
      currency: {
        allowNull: true,
        type: Sequelize.STRING
      },
      avatar: {
        allowNull: true,
        type: Sequelize.STRING
      },
      department: {
        allowNull: true,
        type: Sequelize.STRING
      },
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
