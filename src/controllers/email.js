import helpers from '../utils/helper';
import db from '../database/models/index';
import sendResult from '../utils/sendResult';
import EmailService from '../services/email.service';

const email = {
  async sendReset(req, res) {
    EmailService.resetPasswordEmail(req);
    sendResult(res, 201, `password reset instructions sent to ${req.user.email}`);
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
