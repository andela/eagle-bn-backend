import db from '../database/models/index';

const CommentService = {

  async getComment(id) {
    const result = await db.Comments.findOne({ where: { id },
      raw: true });
    return result;
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
