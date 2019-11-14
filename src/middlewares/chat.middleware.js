import ChatService from '../services/chat.service';
import sendResult from '../utils/sendResult';

const ChatMiddleware = {
  async chatParentExist(req, res, next) {
    const { userId } = req.userData;
    const chatId = req.body.parentId || req.params.parentId;
    if (chatId) {
      const chat = await ChatService.getSingleChat(chatId);
      if (!chat) return sendResult(res, 404, 'parent chat or chat parameter not found');
      if (chat.authorId !== userId && chat.receiverId !== userId && chat.receiverId !== null) {
        return sendResult(res, 403, 'You are not part of this private chat');
      }
    }
    return next();
  }
};

export default ChatMiddleware;
