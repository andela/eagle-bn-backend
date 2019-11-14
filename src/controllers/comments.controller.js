import sendResult from '../utils/sendResult';
import CommentService from '../services/comment.service';
import NotificationService from '../services/notifications.service';
import UserService from '../services/user.service';
import NotificationUtil from '../utils/notification.util';

const CommentsController = {
  addComment: async (req, res) => {
    const { comment, parent } = req.body;
    const newComment = await CommentService.createComment({
      comment,
      userId: req.userData.userId,
      requestId: req.params.requestId,
      parent
    });
    const { lineManager, id } = await UserService.getUser({ id: req.request.UserId });
    // CREATE NOTIFICATION FOR THE REQUESER OR MANAGER
    const userId = (lineManager === req.userData.userId) ? id : lineManager;
    const notification = await NotificationService.createNotification({
      modelName: 'Comments',
      modelId: newComment.id,
      type: 'new_comment',
      userId,
    });
    // EMITTING ECHO FOR NEW NOTIFICATION
    NotificationUtil.echoNotification(req, notification, 'new_comment', userId);
    if (parent) {
      return sendResult(res, 201, `reply to comment ${parent}`, newComment);
    }
    sendResult(res, 201, 'Comment Created', newComment);
  },
  viewComment: async (req, res) => {
    const comments = await CommentService.getComments(req.params.requestId);
    sendResult(res, 200, 'Comments', comments);
  },
  async getComment(req, res) {
    const { deletedAt, ...data } = req.comment;
    sendResult(res, 200, 'Comment', data);
  },
  updateComment: async (req, res) => {
    await CommentService.updateComment(req.params.commentId, req.body.comment);
    sendResult(res, 200, 'Comment Updated Successful');
  },
  trashComment: async (req, res) => {
    await CommentService.trashComment(req.params.commentId);
    sendResult(res, 200, 'Comment Deleted Successful');
  }
};


export default CommentsController;
