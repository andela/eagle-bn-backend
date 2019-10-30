'use strict';
module.exports = (sequelize, DataTypes) => {
  const bookingReview = sequelize.define('BookingReviews', {
    BookingId: DataTypes.INTEGER,
    feedback: DataTypes.STRING,
    rating: DataTypes.INTEGER
  }, {});
  bookingReview.associate = function(models) {
     bookingReview.belongsTo(models.Bookings, {
    foreignKey: {
      allowNull: false,
    },
    });
  };
  return bookingReview;
};