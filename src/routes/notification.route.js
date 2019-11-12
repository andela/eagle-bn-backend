import express from 'express';
import UserMiddleware from '../middlewares/userMiddlware';
import NotificationMiddleware from '../middlewares/notification.middleware';
import NotificationController from '../controllers/notifications.controller';
import Validation from '../validation';

const app = express.Router();

const { checkToken } = UserMiddleware;
const { checkNotificationExists, checkNotificationOwner } = NotificationMiddleware;
const {
  getUserNotifications, updateNotificationStatus, getSingleNotification, markAllNotificationsAsRead
} = NotificationController;
const { idValidate } = Validation;

app.get('/', checkToken, getUserNotifications);
app.get('/:id', checkToken, checkNotificationExists, checkNotificationOwner, getSingleNotification);
app.patch('/:id/status', idValidate, checkToken, checkNotificationExists, checkNotificationOwner, updateNotificationStatus);
app.patch('/readall', checkToken, markAllNotificationsAsRead);

export default app;
