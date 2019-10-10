import helpers from '../utils/helper';
import db from '../database/models/index';
import sendResult from '../utils/sendResult';
import mail from '../utils/email';
import string from '../utils/stringHelper';

const User = {
  async signup(req, res) {
    const { username, password, email } = req.body;

    const response = await db.Users.create({
      email,
      password: helpers.hashPassword(password),
      username
    });

    const userData = response.get({ plain: true });
    userData.password = undefined;
    const token = helpers.createToken(userData.id, email, false);
    // send verification email the user,
    mail(email, process.env.EMAIL_SENDER, 'email verification', string.emailBody(req, token));
    const data = { ...userData };
    return sendResult(res, 201, 'Account created successfully', data);
  },

  async login(req, res) {
    const { email, password } = req.body;
    const userInfo = await db.Users.findOne({
      where: {
        email
      },
    });
    if (!userInfo) return sendResult(res, 400, 'The email and/or password is invalid');
    const comfirmPass = helpers.comparePassword(password, userInfo.password);
    if (comfirmPass) {
      const token = helpers.createToken(userInfo.id, userInfo.email, userInfo.isverified);
      const {
        id, username, isverified
      } = userInfo;
      const data = {
        userid: id, username, email, isverified, token
      };
      if (!isverified) {
        return sendResult(res, 400, 'Please verify your account first');
      }
      return sendResult(res, 201, 'User logged successfully', data);
    }
    return sendResult(res, 400, 'The email and/or password is invalid');
  },

  async verifyEmail(req, res) {
    try {
      const user = await helpers.verifyToken(helpers.getToken(req));
      if (!user || user.error || !(user.userId) || !(user.email)) return sendResult(res, 401, 'invalid token, try to check your email again');
      await db.Users.update(
        { isverified: true },
        {
        // eslint-disable-next-line radix
          where: { id: user.userId },
        },
      );
      return sendResult(res, 200, 'email verified! try to login with your existing account');
    } catch (error) {
      return sendResult(res, 500, `it is not you, it is us\n${error.message}`);
    }
  },
};
export default User;
