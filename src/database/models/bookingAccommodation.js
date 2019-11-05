'use strict';
module.exports = (sequelize, DataTypes) => {
  const booking = sequelize.define('Bookings', {
    TripId : DataTypes.INTEGER,
    AccommodationId: DataTypes.INTEGER,
    numberOfSpace: {
      type:  DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false
    },
    UserId: DataTypes.INTEGER,
    start: DataTypes.DATE,
    end: DataTypes.DATE,
  }, {});
  booking.associate = function(models) {
    booking.belongsTo(models.Accommodations, {
      foreignKey: {
        allowNull: false,
      },
     });
   booking.belongsTo(models.Users, {
    foreignKey: {
      allowNull: false,
    },
    });
    booking.belongsTo(models.Trips, {
     foreignKey: {
    allowNull: false,
   },
    });
    booking.hasOne(models.Ratings, {
      foreignKey: {
     allowNull: false,
    },
     })
  };
  return booking;
};
