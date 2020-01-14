import EchoUtil from './echo.util';

const NotificationUtil = {
  echoNotification(req, notification, type, receiverId) {
    try {
      notification = notification.get({ plain: true });
    // eslint-disable-next-line no-empty
    } catch (e) {}
    EchoUtil.sendEchoNotification(receiverId, notification, req.connectedClients, req.io, type);
  }
};

export default NotificationUtil;
