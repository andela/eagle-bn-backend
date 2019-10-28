import express from 'express';
import userRouter from './userRoutes';
import accommodationRouter from './accommodationRoute';
import requestRouter from './requestRoutes';
import currencyRouter from './currencies.routes';

const app = express.Router();

app.use('/users', userRouter);
app.use('/accommodations', accommodationRouter);
app.use('/requests', requestRouter);
app.use('/currencies', currencyRouter);

export default app;
