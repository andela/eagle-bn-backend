'use strict';
module.exports = (sequelize, DataTypes) => {
  const Requests = sequelize.define('Requests', {
    returnTime: { type: DataTypes.STRING },
    country: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: 'pending' },
    timeZone: { type: DataTypes.STRING, allowNull: false },
  }, { freezeTableName: true });
  Requests.associate = function(models) {
    Requests.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false,
      },
      onDelete: 'CASCADE',
    });
    Requests.hasMany(models.Trips, {
      foreignKey: 'RequestId',
      targetKey: 'id',
    });
  };
  return Requests;
};
