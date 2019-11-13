import express from 'express';
import destinationController from '../controllers/destinations.controller';

const app = express.Router();
app.get('/most-traveled', destinationController.getDestinations);

export default app;
