import sendResult from '../utils/sendResult';
import db from '../database/models/index';

const User = {
  async checkuserExist(req, res, next) {
    const existingUser = await db.Users.findOne({ where: { email: req.body.email }, raw: true });
    if (existingUser) return sendResult(res, 409, 'This email already exists');
    next();
  },
  async checkloginEntries(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
      return sendResult(res, 400, 'Both email and password are required');
    }
    next();
  }
};
export default User;
