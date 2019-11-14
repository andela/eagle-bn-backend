import express from 'express';
import ChatsController from '../controllers/chats.controller';
import UserMiddleware from '../middlewares/user.middleware';
import AccommodationMiddleware from '../middlewares/accommodation.middleware';
import validator from '../validation';
import ChatMiddleware from '../middlewares/chat.middleware';

const app = express.Router();

app.post('/', validator.addChats, AccommodationMiddleware.accommodationExists, UserMiddleware.checkToken, ChatMiddleware.chatParentExist, UserMiddleware.checkReceiverExist, ChatsController.postChat);
app.get('/', validator.getChats, UserMiddleware.checkToken, ChatsController.getChats);
app.get('/:parentId/replies', validator.validateParentChatId, UserMiddleware.checkToken, ChatMiddleware.chatParentExist, ChatsController.getReplies);

export default app;
