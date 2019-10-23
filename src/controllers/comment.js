import db from '../database/models/index';
import sendResult from '../utils/sendResult';

const comment = {
  addComment: async (req, res) => {
    const newComment = await db.Comments.create({
      comment: req.body.comment,
      userId: req.userData.userId,
      requestId: 1,
    });
    sendResult(res, 201, 'Comment Created', newComment);
  },
};


export default comment;
