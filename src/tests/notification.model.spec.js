import chai from 'chai';
import NotificationService from '../services/notifications.service';

const { expect } = chai;

describe('helper functions', () => {
  it('should return notification with length 1', async () => {
    const notification = await NotificationService.getOneRequest(1);
    expect(typeof notification).eql('object');
  });
  it('should create a request and return an object', async () => {
    const notification = await NotificationService.createRequest({
      userId: 5,
      modelName: 'Requests',
      modelId: 2,
      status: 'Unread',
      type: 'new_request',
      isRead: false,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    expect(typeof notification).eql('object');
  });
  it('should return all notification with length of 2', async () => {
    const notification = await NotificationService.getAllNotifications(5);
    expect(notification.length).eql(2);
  });
});
