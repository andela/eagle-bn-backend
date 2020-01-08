import { Sequelize } from 'sequelize';
import db from '../database/models/index';

const BookingService = {

  async getBookingById(id) {
    const result = await db.Bookings.findOne({
      where: { id },
      raw: true,
    });
    return result;
  },

  async getAllBooking(UserId) {
    const image = [{ model: db.AccommodationImages, attributes: { exclude: ['id', 'accommodationid', 'createdAt', 'updatedAt'] } }];
    const accommodation = { model: db.Accommodations, include: image, attributes: { exclude: ['id', 'createdAt', 'updatedAt'] } };
    const rating = { model: db.Ratings, attributes: { exclude: ['id', 'createdAt', 'updatedAt'] } };

    const result = await db.Bookings.findAll({
      where: { UserId },
      include: [accommodation, rating],
    });
    return result;
  },
  async createBooking(booking) {
    const result = await db.Bookings.create(booking, { raw: true });
    return result.get({ plain: true });
  },

  async getRating(BookingId) {
    const result = await db.Ratings.findOne({
      where: { BookingId },
    });
    return result;
  },

  async setRating(newData, BookingId) {
    const existingRating = await this.getRating(BookingId);
    let result;
    if (existingRating) result = existingRating.update(newData);
    else {
      result = db.Ratings.create({
        BookingId, ...newData
      });
    }
    return result;
  },
  async getAverageAccommodationRating(AccommodationId) {
    const result = await db.Ratings.findAll({
      attributes: [[Sequelize.fn('avg', Sequelize.col('rating')), 'averageRating']],
      include: [{ model: db.Bookings, where: { AccommodationId }, attributes: [] }],
      raw: true,
    });
    return result;
  },
  async getAccommodationFeedback(AccommodationId) {
    const result = await db.Ratings.findAll({
      attributes: ['feedback', 'id'],
      include: [
        {
          model: db.Bookings,
          where: { AccommodationId },
          attributes: ['UserId'],
          include: [{ model: db.Users, attributes: ['fullname', 'avatar'] }]
        }
      ]
    });
    const formatedResult = result.map(element => ({
      feedbackId: element.id,
      feedback: element.feedback,
      author: element.Booking.User.fullname,
      avatar: element.Booking.User.avatar,
      authorId: element.Booking.UserId
    }));
    return formatedResult;
  },
};
export default BookingService;
