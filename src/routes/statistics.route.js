import express from 'express';
import StatisticsController from '../controllers/statistics.controller';

const app = express.Router();
app.get('/traveled-destinations', StatisticsController.getDestinations);

export default app;
