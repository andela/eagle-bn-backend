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
  async addChat(obj, userId) {
    const include = [{ model: db.Users, attributes: ['fullname', 'id'], as: 'receiver' },
      { model: db.Users, attributes: ['fullname', 'id'], as: 'author' },
      { model: db.Accommodations, attributes: ['name', 'id', 'userid'], as: 'accommodation' },
    ];
    const newChat = await db.Chats.create(obj);
    const chat = await db.Chats.findAll({ where: newChat.id, include });
    return groupBy(getContacts(chat, userId), 'contactId');
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
      include: [{ model: db.Users, attributes: ['fullname', 'id'], as: 'receiver' },
        { model: db.Users, attributes: ['fullname', 'id'], as: 'author' },
        { model: db.Accommodations, attributes: ['name', 'id', 'userid'], as: 'accommodation' },
      ],
      offset,
      limit,
      order: [['id', 'DESC']]
    });
    return groupBy(getContacts(chats, userId), 'contactId');
  },
};

export default ChatService;
