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
    const { id, isRead } = req.notification;
    await NotificationService.setNotificationStatus(id, !(isRead));
    return sendResult(
      res,
      200,
      `Notification status updated to ${!(isRead)}!`
    );
  },

  async markAllNotificationsAsRead(req, res) {
    const { userId } = req.userData;
    await NotificationService.markAllAsRead(userId);
    return sendResult(
      res,
      200,
      'All notifications are marked as read',
    );
  }
};

export default NotificationController;
