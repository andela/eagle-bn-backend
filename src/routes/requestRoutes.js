import express from 'express';
import requestController from '../controllers/requestController';
import { isUserVerified } from '../middlewares';

const app = express.Router();

/**
 * @swagger
 * /requests/:
 *   get:
 *     description: get requests
 *     tags:
 *      - Requests
 *     produces:
 *      - application/json
 *     parameters:
 *      - in: header
 *        name: Authorization
 *        description: The token
 *     responses:
 *       200:
 *         description: trips
 *         schema:
 *           type: object
 *           properties:
 *             msg:
 *               type: string
 *       400:
 *         description: Wrong data sent
 */

app.get('/', isUserVerified, requestController.getRequest);

export default app;
