import express from 'express';
import userRouter from './userRoutes';
import requestRouter from './requestRoutes';

const app = express.Router();

app.use('/users', userRouter);
app.use('/requests', requestRouter);

export default app;
