import db from '../database/models/index';
import sendResult from '../utils/sendResult';
import { transporter } from '../config/index';
import stringHelper from '../utils/stringHelper';
import findUser from '../utils/queries';

const changeRole = async (req, res) => {
  const user = await findUser(req);

  await db.Users.update({ RoleId: user.id }, { where: { email: req.body.email } });

  await transporter.sendMail({
    from: process.env.MAIL_SENDER,
    to: req.body.email,
    subject: 'no-reply barefoot nomad ✔',
    html: stringHelper.changeRoleEmail(req)
  });

  const data = {
    status: 200,
    message: `Super admininstrator successfully changed role of ${req.body.email}`,
    old_role: req.old_role,
    new_role: req.body.new_role
  };
  return sendResult(res, 200, data);
};

export default changeRole;
