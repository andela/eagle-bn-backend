import express from 'express';
import BookingsController from '../controllers/bookings.controller';
import BookingMiddleware from '../middlewares/booking.middleware';
import UserMiddleware from '../middlewares/userMiddlware';
import validation from '../validation';

const app = express.Router();

const { checkToken } = UserMiddleware;
const { checkUserBooking } = BookingMiddleware;
const { setAccommodationRating } = BookingsController;
const { reviewDateValidation, reviewValidation } = validation;

app.patch('/:id/rate', reviewValidation, checkToken, checkUserBooking, reviewDateValidation, setAccommodationRating);

export default app;
