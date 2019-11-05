import BookingService from '../services/booking.service';
import UserService from '../services/user.service';
import sendResult from '../utils/sendResult';

const BookingsController = {
  async setAccommodationRating(req, res) {
    const { feedback, rating } = req.body;
    const { id } = req.params;

    const result = await BookingService.setRating({ feedback, rating }, id);
    return sendResult(res, 200, 'The booking has been rated successfuly', result);
  },

  async getRating(req, res) {
    const { accommodationId } = req.params;

    const result = await BookingService.getAverageAccommodationRating(accommodationId);
    let { averageRating } = result[0];
    if (averageRating === null) return sendResult(res, 404, 'There is no rating for this accommodation');
    averageRating = parseFloat(averageRating).toFixed(2);
    const feedbackList = await BookingService.getAccommodationFeedback(accommodationId);
    return sendResult(res, 200, 'Accommodation rating', { averageRating, feedbackList });
  },

  async createBooking(req, res) {
    const { TripId, AccommodationId, start, end, numberOfSpace } = req.body;
    const { userId } = req.userData;
    const result = await BookingService.createBooking({
      TripId, AccommodationId, start, end, numberOfSpace, UserId: userId });
    result.tripId = result.TripId;
    result.accommodationId = result.AccommodationId;
    result.userId = result.UserId;
    const { fullname } = await UserService.getUser({ id: userId });
    result.fullname = fullname;
    delete result.TripId;
    delete result.AccommodationId;
    delete result.UserId;
    return sendResult(res, 201, 'Booking details', result);
  },

  async getBooking(req, res) {
    const { id } = req.params;
    const result = await BookingService.getBookingById(id);
    result.tripId = result.TripId;
    result.accommodationId = result.AccommodationId;
    result.userId = result.UserId;
    const { fullname } = await UserService.getUser({ id: result.userId });
    result.fullname = fullname;
    delete result.TripId;
    delete result.AccommodationId;
    delete result.UserId;
    return sendResult(res, 200, result);
  }
};

export default BookingsController;
