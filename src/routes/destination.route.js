import express from 'express';
import destinationController from '../controllers/destinations.controller';

const app = express.Router();
app.get('/traveled-destinations', destinationController.getDestinations);

export default app;
