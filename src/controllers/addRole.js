import db from '../database/models/index';
import sendResult from '../utils/sendResult';

const addRole = async (req, res) => {
  const addrole = await db.Roles
    .findOrCreate({
      where: { roleValue: req.body.role_value },
      defaults: { roleName: req.body.role_name, roleValue: req.body.role_value }
    });
  const data = {
    id: addrole[0].id,
    role_name: addrole[0].roleName,
    role_value: addrole[0].roleValue
  };

  return sendResult(res, 200, 'Role information', data);
};

export default addRole;
