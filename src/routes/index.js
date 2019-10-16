import express from 'express';
import userRouter from './userRoutes';
import accommodationRouter from './accommodationRoute';

const app = express.Router();

app.use('/users', userRouter);
app.use('/accommodations', accommodationRouter);
export default app;
