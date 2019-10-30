import bookingService from '../services/booking.service';
import sendResult from '../utils/sendResult';

export default {
  async reviewAccommodation(req, res) {
    const { feedback, rating } = req.body;
    const { id } = req.params;

    const result = await bookingService.addReview({ feedback, rating }, id);
    return sendResult(res, 200, 'updated booking', result);
  },

  async getAverageRating(req, res) {
    const { id } = req.params;

    const result = await bookingService.getAverageAccommodationRating(id);
    return sendResult(res, 200, 'Average rating', result);
  },

  async getAccommodationFeedbacks(req, res) {
    const { id } = req.params;

    const result = await bookingService.getAccommodationFeedback(id);
    return sendResult(res, 200, 'Feedbacks', result);
  }
};
