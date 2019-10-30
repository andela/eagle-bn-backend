import sendResult from '../utils/sendResult';
import bookingService from '../services/booking.service';

export default {
  async checkUserBooking(req, res, next) {
    const { id } = req.params;
    const { userData } = req;
    const booking = await bookingService.getBookingById(id);
    if (booking && booking.UserId === userData.userId) {
      req.booking = booking;
      return next();
    }
    return sendResult(res, 404, 'You have never booked this accomodation');
  }
};
