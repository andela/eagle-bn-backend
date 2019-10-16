'use strict';
/**
 * @swagger
 *
 * definitions:
 *   User:
 *     type: object
 *     required:
 *       - email
 *       - password
 *       - username
 *     properties:
 *       username:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 *         format: password
 *       createdAt:
 *         type: string
 *       updatedAt: 
 *         type: string
 *       token:
 *         type: string
 */
/**
 * @swagger
 *
 * definitions:
 *   login:
 *     type: object
 *     required:
 *       - userid
 *       - username
 *       - email
 *     properties:
 *       userid:
 *         type: string
 *       username:
 *         type: string
 *       email:
 *         type: string
 *       token:
 *         type: string
 */


module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('Users', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    username: DataTypes.STRING,
    isverified: DataTypes.BOOLEAN,
    role: DataTypes.STRING,
    phone: DataTypes.STRING,
    gender: DataTypes.STRING,
    dob: DataTypes.DATE,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    language: DataTypes.STRING,
    currency: DataTypes.STRING,
    avatar: DataTypes.STRING,
    company: DataTypes.STRING,
    department: DataTypes.STRING
  }, { freezeTableName: true });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
