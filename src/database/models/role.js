'use strict';
module.exports = (sequelize, DataTypes) => {
  const Roles = sequelize.define('Roles', {
    roleName: { type: DataTypes.STRING, allowNull: false },
    roleValue: { type: DataTypes.STRING,  allowNull: false },
  }, { freezeTableName: true });
  Roles.associate = function(models) {
  };
  return Roles;
};
