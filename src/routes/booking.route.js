import express from 'express';
import bookingsController from '../controllers/bookings.controller';
import bookingMiddleware from '../middlewares/booking.middleware';
import userMiddleware from '../middlewares/userMiddlware';
import validation from '../validation';

const app = express.Router();

const { checkToken } = userMiddleware;
const { checkUserBooking } = bookingMiddleware;
const { reviewAccommodation } = bookingsController;
const { reviewDateValidation, reviewValidation } = validation;

app.patch('/:id/review', reviewValidation, checkToken, checkUserBooking, reviewDateValidation, reviewAccommodation);

export default app;
