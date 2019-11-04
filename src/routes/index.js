import express from 'express';
import userRouter from './userRoutes';
import accommodationRouter from './accommodationRoute';
import requestRouter from './requestRoutes';
import bookingRouter from './booking.route';
import notificationRouter from './notification.route';

const app = express.Router();

app.use('/users', userRouter);
app.use('/accommodations', accommodationRouter);
app.use('/requests', requestRouter);
app.use('/bookings', bookingRouter);
app.use('/notifications', notificationRouter);

export default app;
