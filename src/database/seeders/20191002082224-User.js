import helpers from '../../utils/helper';
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.bulkInsert('Users', [{
      fullname: 'alexis',
      email: 'alexismajyambere@gmail.com',
      password: helpers.hashPassword('12345678UUi@'),
      isverified: true,
      RoleId:6,
      rememberMe: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      fullname: 'admin',
      email: 'andelaeagle@gmail.com',
      password: helpers.hashPassword('eagle123!'),
      isverified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      RoleId:1,
      rememberMe: false
    },{
      fullname: 'requester',
      email: 'requester@gmail.com',
      password: helpers.hashPassword('eagle123!'),
      isverified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      RoleId:5,
      rememberMe: false
    },{
      fullname: 'dummy',
      email: 'dummy@gmail.com',
      password: helpers.hashPassword('eagle123!'),
      isverified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      RoleId:5,
      rememberMe: false
    },
    {
      fullname: 'manager',
      email: 'manager@gmail.com',
      password: helpers.hashPassword('eagle123!'),
      isverified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      RoleId: 4,
      rememberMe: false
  }])
  ]),
  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.bulkDelete('Users', null, {})
  ])
};
