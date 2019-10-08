/* eslint-disable require-jsdoc */
import helpers from '../utils/helper';
import db from '../database/models/index';
import sendResult from '../utils/sendResult';

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
    const data = { ...userData, token };
    return sendResult(res, 201, 'Account created successfully', data);
  },
  async login(req, res) {
    const { email, password } = req.body;
    if(! email || ! password ||!(email && password))
    return sendResult(res, 401, 'Both email and password are required');
    const userInfo = await db.Users.findOne({
      where: {
        email,
      },
    });
    if (!userInfo) {
      return sendResult(res, 401, 'Univerifed account or the email and/or password is invalid');
    }

    const comfirmPass = helpers.comparePassword(password, userInfo.password);
    if (comfirmPass) {
      const token = helpers.createToken(userInfo.id, userInfo.email,false);
      const {
        id, username,
      } = userInfo;
      const data = {
        id, username, email, token,
      };
      return sendResult(res, 201, 'User logged successfully', data);
    }
    return sendResult(res, 401, 'Univerifed account or the email and/or password is invalid');
  },
};
export default User;
