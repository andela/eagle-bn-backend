import db from '../database/models/index';


export default async (req, res) => {
  const allUser = await db.Users.findAll({ attributes: ['id', 'username', 'email'], include: [{ model: db.Roles, attributes: { exclude: ['createdAt', 'updatedAt'] } }] });
  return res.status(200).json(allUser);
};
