import db from '../database/models/index';

const CommentService = {

  async checkComment(id) {
    const result = await db.Comments.findOne({ where: { id },
      raw: true });
    return result;
  },
  async deleteComment(id) {
    const result = await db.Comments.update({ isDeleted: 1 }, { where: { id } });
    return result;
  },
  async updateComment(id, comment) {
    const result = await db.Comments.update(
      { comment },
      { where: { id },
      }
    );

    return result;
  }

};

export default CommentService;
