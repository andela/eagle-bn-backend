import NotificationService from '../services/notifications.service';
import sendResult from '../utils/sendResult';

const NotificationController = {
  async getUserNotifications(req, res) {
    const { userId } = req.userData;
    return sendResult(
      res,
      200,
      'Notifications',
      await NotificationService.getAllNotifications(userId)
    );
  },

  async getSingleNotification(req, res) {
    return sendResult(
      res,
      200,
      'Notification',
      req.notification,
    );
  },

  async updateNotificationStatus(req, res) {
    const { id, status } = req.params;
    const isRead = (status === 'read');
    await NotificationService.setNotificationStatus(id, isRead);
    return sendResult(
      res,
      200,
      'Notification status updated!'
    );
  },
};

export default NotificationController;
