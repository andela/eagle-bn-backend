import express from 'express';
import ChatsController from '../controllers/chats.controller';
import UserMiddleware from '../middlewares/user.middleware';
import AccommodationMiddleware from '../middlewares/accommodation.middleware';
import validator from '../validation';

const app = express.Router();

app.post('/', validator.addChats, AccommodationMiddleware.accommodationExists, UserMiddleware.checkToken, UserMiddleware.checkReceiverExist, ChatsController.postChat);
app.get('/', validator.getChats, UserMiddleware.checkToken, ChatsController.getChats);
export default app;
