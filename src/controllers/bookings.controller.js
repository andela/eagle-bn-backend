import BookingService from '../services/booking.service';
import sendResult from '../utils/sendResult';

const BookingsController = {
  async setAccommodationRating(req, res) {
    const { feedback, rating } = req.body;
    const { id } = req.params;

    const result = await BookingService.setRating({ feedback, rating }, id);
    return sendResult(res, 200, 'rating', result);
  },

  async getRating(req, res) {
    const { accommodationId } = req.params;

    const result = await BookingService.getAverageAccommodationRating(accommodationId);
    const { averageRating } = result[0];
    const feedbackList = await BookingService.getAccommodationFeedback(accommodationId);
    return sendResult(res, 200, 'Accommodation rating', { averageRating, feedbackList });
  },
};

export default BookingsController;
