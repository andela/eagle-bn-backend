import ChatService from '../services/chat.service';
import sendResult from '../utils/sendResult';
import EchoUtil from '../utils/echo.util';

const ChatsController = {
  async postChat(req, res) {
    const { message, receiverId, AccommodationId, parentId } = req.body;
    const { userId, fullname } = req.userData;
    const { io } = req;
    const chat = {
      authorId: userId,
      message,
      receiverId,
      parentId,
      AccommodationId
    };
    const result = await ChatService.addChat(chat);
    const chatResult = result.get({ plain: true });
    chatResult.authorName = fullname;
    EchoUtil.sendEchoNotification(receiverId, chatResult, req.connectedClients, io, 'new_message');
    sendResult(res, 201, 'chat posted successfully', chatResult);
  },

  async getChats(req, res) {
    const { userId } = req.userData;
    let { limit, offset } = req.query;

    if (!limit) limit = 10;
    if (!offset) offset = 0;
    const chatList = await ChatService.getChat(userId, offset, limit);

    sendResult(res, 200, 'chat list', chatList);
  },

  async getReplies(req, res) {
    const { parentId } = req.params;
    const chats = await ChatService.getMessageReply(parentId);

    sendResult(res, 200, 'chat replies', chats);
  }
};

export default ChatsController;
