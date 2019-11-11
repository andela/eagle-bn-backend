import express from 'express';
import userRouter from './userRoutes';
import accommodationRouter from './accommodationRoute';
import requestRouter from './requestRoutes';
import bookingRouter from './booking.route';
// eslint-disable-next-line import/no-cycle
import chatRouter from './chat.route';
import notificationRouter from './notification.route';

const app = express.Router();

app.use('/users', userRouter);
app.use('/accommodations', accommodationRouter);
app.use('/requests', requestRouter);
app.use('/bookings', bookingRouter);
app.use('/chats', chatRouter);
app.use('/notifications', notificationRouter);

export default app;
