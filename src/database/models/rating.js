'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Ratings', {
    BookingId: DataTypes.INTEGER,
    feedback: DataTypes.STRING,
    rating: DataTypes.INTEGER
  }, {});
  Rating.associate = function(models) {
     Rating.belongsTo(models.Bookings, {
    foreignKey: {
      allowNull: false,
    },
    });
  };
  return Rating;
};
