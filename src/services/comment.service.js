/* eslint-disable no-unused-vars */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
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
  async getReplies(id) {
    const replies = await db.Comments.findAll({
      where: { parent: id, deletedAt: null },
      attributes: { exclude: ['requestId', 'deletedAt'] },
      include: [{ model: db.Users, attributes: ['RoleId', 'fullname'] }],
      order: [
        ['createdAt', 'DESC'],
      ],
      raw: true
    });
    return replies;
  },
  async getComments(requestId) {
    const result = await db.Comments.findAll({
      where: { requestId, parent: null, deletedAt: null },
      attributes: { exclude: ['requestId', 'deletedAt', 'parent'] },
      include: [{ model: db.Users, attributes: ['RoleId', 'fullname'] }],
      order: [
        ['createdAt', 'DESC'],
      ],
      raw: true
    });
    for (const [key, value] of Object.entries(result)) {
      value.replies = await this.getReplies(value.id);
    }
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
