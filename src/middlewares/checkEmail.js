import db from '../database/models/index';
import sendResult from '../utils/sendResult';

const checkEmail = async (req, res, next) => {
  const newRole = await db.Roles.findOne({ where: { id: req.user.RoleId } });
  // check if user has the same role as the new role
  if (newRole.roleValue === req.body.new_role) return sendResult(res, 400, 'User already has this role');
  // go to the next route
  next();
};

export default checkEmail;
