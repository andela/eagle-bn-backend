import db from '../database/models/index';
import sendResult from '../utils/sendResult';


export default async (req, res) => {
  const allUser = await db.Users.findAll({ attributes: ['id', 'username', 'email'], include: [{ model: db.Roles, attributes: { exclude: ['createdAt', 'updatedAt'] } }] });
  return sendResult(res, 200, 'User information', allUser);
};
