import { Op } from 'sequelize';
import db from '../database/models/index';

const groupBy = (array, key) => array.reduce((newArray, element) => {
  if (element[key] === null) element[key] = 'public';
  (newArray[element[key]] = newArray[element[key]] || []).push(element);
  return newArray;
}, {});

const ChatService = {
  async addChat(chat) {
    const newChat = await db.Chats.create(chat);
    return newChat;
  },

  async getChat(userId, offset, limit) {
    const chats = await db.Chats.findAll({
      where: {
        [Op.or]: [
          { authorId: userId },
          { receiverId: null },
          { receiverId: userId },
        ],
      },
      offset,
      limit,
    });
    return groupBy(chats, 'receiverId');
  }
};

export default ChatService;
