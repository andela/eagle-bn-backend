import express from 'express';
import BookingsController from '../controllers/bookings.controller';
import BookingMiddleware from '../middlewares/booking.middleware';
import UserMiddleware from '../middlewares/user.middleware';
import Validation from '../validation';
import AccommodationMiddleware from '../middlewares/accommodation.middleware';

const app = express.Router();

const { checkToken } = UserMiddleware;
const { checkUserBooking, bookingExist } = BookingMiddleware;
const { setAccommodationRating, createBooking, getBooking, getAllBooking } = BookingsController;
const {
  reviewDateValidation, reviewValidation, validateBooking, getBookingValidation
} = Validation;
const { accommodationExists, isAccommodationAvailable } = AccommodationMiddleware;

app.patch('/:id/rate', reviewValidation, checkToken, checkUserBooking, reviewDateValidation, setAccommodationRating);
app.post(
  '/', checkToken, validateBooking,
  accommodationExists, isAccommodationAvailable,
  createBooking
);
app.get('/:id', checkToken, getBookingValidation, bookingExist, checkUserBooking, getBooking);
app.get('/', checkToken, getAllBooking);

export default app;
