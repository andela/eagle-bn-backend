import express from 'express';
import valid from '../validation';
import currencyController from '../controllers/currencies.controller';

const app = express.Router();

const { currencyValidation } = valid;

app.post('/', currencyValidation, currencyController);

export default app;
