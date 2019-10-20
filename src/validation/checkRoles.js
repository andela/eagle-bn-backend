import validator from '../utils/validator';
import sendResult from '../utils/sendResult';
import db from '../database/models/index';

export const checkRole = async (req, res, next) => {
  try {
    new validator({ email: req }).req().email();
    new validator({ new_role: req }).req().min(2).alpha();
  } catch (error) {
    return sendResult(res, 400, error.message);
  }

  const checkIfExist = await db.Roles.findOne({ where: { roleValue: req.body.new_role } });

  if (!checkIfExist) return sendResult(res, 400, 'Role Value does not exist');

  return next();
};

export const newRole = async (req, res, next) => {
  try {
    new validator({ role_name: req }).req().min(4).str();
    new validator({ role_value: req }).req().min(4).str();
  } catch (error) {
    return sendResult(res, 400, error.message);
  }
  next();
};
