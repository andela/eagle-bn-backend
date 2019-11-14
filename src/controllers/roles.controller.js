import sendResult from '../utils/sendResult';
import EmailService from '../services/email.service';
import RoleService from '../services/role.service';
import UserService from '../services/user.service';

const role = {
  changeRole: async (req, res) => {
    const newRole = await RoleService.getRole({ id: req.user.RoleId });
    // check if user has the same role as the new role
    if (newRole.roleValue === req.body.new_role) return sendResult(res, 400, 'User already has this role');
    await UserService.updateUser({ RoleId: req.new_role_id }, { email: req.body.email });

    await EmailService.sendRoleChangedEmail(req);
    const data = {
      status: 200,
      message: `Super admininstrator successfully changed role of ${req.body.email}`,
      old_role: req.old_role,
      new_role: req.body.new_role
    };
    return sendResult(res, 200, data);
  },
  allRole: async (req, res) => {
    const allUser = await UserService.getAllUsersRole();
    return sendResult(res, 200, 'User information', allUser);
  },

};

export default role;
