import db from '../database/models';

const NotificationService = {
  getOneRequest: async (id) => db.Notifications.findOne({ where: { id }, raw: true }),
  getAllNotifications: async (userId) => db.Notifications
    .findAll({ where: { userId }, raw: true }),
  createRequest: async (notification) => db.Notifications.create(notification, { raw: true }),
};

export default NotificationService;

