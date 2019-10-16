'use strict';
module.exports = (sequelize, DataTypes) => {
  const Trips = sequelize.define('Trips', {
    departureTime: { type: DataTypes.DATE, allowNull: false },
    destination: { type: DataTypes.STRING, allowNull: false },
    reason: { type: DataTypes.TEXT,  allowNull: false },
  }, { freezeTableName: true });
  Trips.associate = function(models) {
    Trips.belongsTo(models.Requests, {
      foreignKey: {
        allowNull: false,
      },
      onDelete: 'CASCADE',
    });

  };
  return Trips;
};
