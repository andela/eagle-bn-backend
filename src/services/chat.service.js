import { Op } from 'sequelize';
import db from '../database/models/index';

const groupBy = (array, key) => array.reduce((newArray, element) => {
  (newArray[element[key]] = newArray[element[key]] || []).push(element);
  return newArray;
}, {});

const getContacts = (chats, userId) => {
  const newChats = chats.map(element => {
    if (element.receiverId === userId) {
      element.contactId = [element.authorId, element.author.fullname];
    } else if (element.receiverId === null) element.contactId = 'public';
    else element.contactId = [element.receiverId, element.receiver.fullname];
    element.author = {};
    element.receiver = undefined;
    return element;
  });
  return newChats;
};

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
      include: [{ model: db.Users, attributes: ['fullname'], as: 'receiver' },
        { model: db.Users, attributes: ['fullname'], as: 'author' },
        { model: db.Chats, attributes: ['message', 'authorId'], as: 'parent' },
        { model: db.Accommodations, attributes: ['name'], as: 'accommodation' },
      ],
      offset,
      limit,
      order: [['id', 'DESC']]
    });
    return groupBy(getContacts(chats, userId), 'contactId');
  },

  async getSingleChat(id) {
    const chat = db.Chats.findOne({ where: { id } });
    return chat;
  },

  async getMessageReply(id) {
    const chats = await db.Chats.findAll({
      where: { parentId: id },
      include: [{ model: db.Users, attributes: ['fullname'], as: 'receiver' },
        { model: db.Users, attributes: ['fullname'], as: 'author' },
        { model: db.Chats, attributes: ['message', 'authorId'], as: 'parent' },
        { model: db.Accommodations, attributes: ['name'], as: 'accommodation' },
      ],
      order: [['id', 'DESC']]
    });
    return chats;
  }
};

export default ChatService;
