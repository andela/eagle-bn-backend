import sendResult from '../utils/sendResult';
import BookingService from '../services/booking.service';

const BookingMiddleware = {
  async checkUserBooking(req, res, next) {
    const { id } = req.params;
    const { userData } = req;
    const booking = await BookingService.getBookingById(id);
    if (booking && booking.UserId === userData.userId) {
      req.booking = booking;
      return next();
    }
    return sendResult(res, 404, 'You have never booked this accomodation');
  }
};

export default BookingMiddleware;
