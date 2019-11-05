import NotificationService from '../services/notifications.service';
import sendResult from '../utils/sendResult';

export default {
  checkNotificationOwner: async (req, res, next) => {
    const { userId } = req.notification;
    if (userId === req.userData.userId) return next();
    sendResult(res, 401, 'You are not authorized');
  },
  checkNotificationExists: async (req, res, next) => {
    const id = (parseInt(req.params.id, 10)) || -1;
    const notification = await NotificationService.getOneNotification(id);
    if (notification) {
      req.notification = notification;
      return next();
    }
    return sendResult(res, 404, 'notification not found');
  }
};
