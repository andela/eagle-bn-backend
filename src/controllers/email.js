import helpers from '../utils/helper';
import db from '../database/models/index';
import sendResult from '../utils/sendResult';
import { msg, transporter } from '../config';

const email = {
  sendReset(req, res) {
    const message = { ...msg(req, helpers), to: req.user.email };
    transporter.sendMail(message, (error) => {
      if (error) sendResult(res, 400, error.message);
      sendResult(res, 201, `password reset instructions sent to ${req.user.email}`);
    });
  },

  resetPass(req, res) {
    const userInfo = helpers.decodeToken(req.params.token);
    if (userInfo.error) return sendResult(res, 400, userInfo.error);
    const password = helpers.hashPassword(req.body.password);
    db.Users.update({ password }, { where: { email: userInfo.email } });
    sendResult(res, 200, 'password updated successfully');
  }
};

export default email;
