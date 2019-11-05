import db from '../database/models/index';
import sendResult from '../utils/sendResult';
import CommentService from '../services/comment.service';

const CommentsController = {
  addComment: async (req, res) => {
    const newComment = await db.Comments.create({
      comment: req.body.comment,
      userId: req.userData.userId,
      requestId: req.params.requestId,
    });
    sendResult(res, 201, 'Comment Created', newComment);
  },
  viewComment: async (req, res) => {
    const comments = await db.Requests.findOne({
      where: { id: req.params.requestId },
      attributes: { exclude: ['updatedAt'] },
      include: [{
        model: db.Comments,
        attributes: { exclude: ['id', 'updatedAt', 'requestId', 'userId'] },
        include: [{
          model: db.Users, attributes: ['fullname']
        }]
      }]
    });
    sendResult(res, 201, '', comments);
  },
  updateComment: async (req, res) => {
    await CommentService.updateComment(req.params.commentId, req.body.comment);
    sendResult(res, 201, '', 'Comment Updated Successful');
  },
  trashComment: async (req, res) => {
    await CommentService.trashComment(req.params.commentId);
    sendResult(res, 201, '', 'Comment Deleted');
  }
};


export default CommentsController;
