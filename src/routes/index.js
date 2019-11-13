import express from 'express';
import userRouter from './user.route';
import accommodationRouter from './accommodation.route';
import requestRouter from './request.route';
import bookingRouter from './booking.route';
import chatRouter from './chat.route';
import notificationRouter from './notification.route';
import destinationRouter from './destination.route';

const app = express.Router();

app.use('/users', userRouter);
app.use('/accommodations', accommodationRouter);
app.use('/requests', requestRouter);
app.use('/bookings', bookingRouter);
app.use('/chats', chatRouter);
app.use('/notifications', notificationRouter);
app.use('/destinations', destinationRouter);

export default app;
