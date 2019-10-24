import express from 'express';
import userRouter from './userRoutes';
import accommodationRouter from './accommodationRoute';
import requestRouter from './requestRoutes';
import commentRouter from './commentRoute';

const app = express.Router();

app.use('/users', userRouter);
app.use('/accommodations', accommodationRouter);
app.use('/requests', requestRouter);
app.use('/comments', commentRouter);

export default app;
