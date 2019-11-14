import db from '../database/models/index';

const CommentService = {

  async getComment(id) {
    const result = await db.Comments.findOne({ where: { id },
      attributes: { exclude: ['updatedAt', 'requestId', 'parent'] },
      raw: true });
    const replies = await db.Comments.findAll({ where: { parent: id },
      attributes: { exclude: ['updatedAt', 'requestId', 'deletedAt', 'parent'] },
    });
    if (result) {
      result.replies = replies;
    }
    return result;
  },
  async getComments(requestId) {
    return db.Comments.findAll({
      where: { requestId, parent: null },
      attributes: { exclude: ['updatedAt', 'requestId', 'deletedAt', 'parent'] },
    });
  },
  async trashComment(id) {
    const result = await db.Comments.update(
      {
        deletedAt: new Date().toLocaleString() },
      { where: { id } }
    );
    return result;
  },
  async updateComment(id, comment) {
    const result = await db.Comments.update(
      { comment },
      { where: { id },
      }
    );

    return result;
  },
  async createComment(comment) {
    const result = await db.Comments.create(comment);
    return result.get({ plain: true });
  }
};

export default CommentService;
