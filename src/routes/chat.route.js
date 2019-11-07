import express from 'express';
import ChatsController from '../controllers/chats.controller';
import UserMiddleware from '../middlewares/userMiddlware';
import validator from '../validation';

const app = express.Router();

app.post('/', validator.addChats, UserMiddleware.checkToken, UserMiddleware.checkReceiverExist, ChatsController.postChat);
app.get('/', validator.getChats, UserMiddleware.checkToken, ChatsController.getChats);

export default app;
