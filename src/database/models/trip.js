'use strict';
module.exports = (sequelize, DataTypes) => {
  const Trips = sequelize.define('Trips', {
    departureTime: { type: DataTypes.DATE, allowNull: false },
    country: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    reason: { type: DataTypes.TEXT,  allowNull: false },
    accommodationId: {
      type: 'integer',
      onDelete: 'CASCADE',
      allowNull: true,
      references: {
        model: 'Accommodations',
        key: 'id',
      },
    },
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
