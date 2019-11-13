import helpers from '../utils/helper';
import sendResult from '../utils/sendResult';
import EmailService from '../services/email.service';
import UserService from '../services/user.service';

const email = {
  async sendReset(req, res) {
    await EmailService.sendResetPasswordEmail(req);
    sendResult(res, 201, `password reset instructions sent to ${req.user.email}`);
  },

  async resetPass(req, res) {
    const userInfo = helpers.decodeToken(req.params.token);
    if (userInfo.error) return sendResult(res, 400, userInfo.error);
    const password = helpers.hashPassword(req.body.password);
    await UserService.updateUser({ password }, { email: userInfo.email });
    sendResult(res, 200, 'password updated successfully');
  }
};

export default email;
