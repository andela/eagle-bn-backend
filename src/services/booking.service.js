import { Sequelize } from 'sequelize';
import db from '../database/models/index';

export default {

  async getBookingById(id) {
    const result = await db.Bookings.findOne({
      where: { id },
      raw: true,
    });
    return result;
  },

  async getBookingReview(BookingId) {
    const result = await db.BookingReviews.findOne({
      where: { BookingId },
    });
    return result;
  },

  async addReview(newData, BookingId) {
    const existingReview = await this.getBookingReview(BookingId);
    let result;
    if (existingReview) result = existingReview.update(newData);
    else {
      result = db.BookingReviews.create({
        BookingId, ...newData
      });
    }
    return result;
  },
  async getAverageAccommodationRating(AccommodationId) {
    const result = await db.BookingReviews.findAll({
      attributes: [[Sequelize.fn('avg', Sequelize.col('rating')), 'averageRating']],
      include: [{ model: db.Bookings, where: { AccommodationId }, attributes: [] }],
      raw: true,
    });
    return result;
  },
  async getAccommodationFeedback(AccommodationId) {
    const result = await db.BookingReviews.findAll({
      attributes: ['feedback', 'id'],
      include: [{ model: db.Bookings,
        where: { AccommodationId },
        attributes: ['UserId'],
        include: [
          { model: db.Users, attributes: ['fullname'] }
        ] }],
      raw: true,
    });
    return result;
  }
};

