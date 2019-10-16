import express from 'express';
import userRouter from './userRoutes';
import accommodationRouter from './accommodationRoute';
import requestRouter from './requestRoutes';

const app = express.Router();

app.use('/users', userRouter);
app.use('/accommodations', accommodationRouter);
app.use('/requests', requestRouter);

export default app;
