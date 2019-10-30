import express from 'express';
import userRouter from './userRoutes';
import accommodationRouter from './accommodationRoute';
import requestRouter from './requestRoutes';
import bookingRouter from './booking.route';

const app = express.Router();

app.use('/users', userRouter);
app.use('/accommodations', accommodationRouter);
app.use('/requests', requestRouter);
app.use('/bookings', bookingRouter);

export default app;
