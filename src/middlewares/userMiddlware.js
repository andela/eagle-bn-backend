import sendResult from '../utils/sendResult';
import db from '../database/models/index';
import helper from '../utils/helper';
import cloud from '../config/clound-config';
import UserService from '../services/user.service';

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
  },

  async getUserbyEmail(req, res, next) {
    const user = await db.Users.findOne({
      where: { email: req.body.email || req.user.email },
      raw: true,
    });

    if (!user) return sendResult(res, 409, 'User with email not found');

    req.user = user;
    next();
  },

  async getUserById(req, res, next) {
    const { id } = req.params;
    const user = await UserService.getUser({ id });
    if (!user) return sendResult(res, 404, 'User with id not found');
    req.user = user;
    next();
  },

  verifyToken(req, res, next) {
    const token = helper.getToken(req);
    if (!token) return sendResult(res, 400, 'provide token to get access');

    const userData = helper.decodeToken(token);
    if (userData.error) return sendResult(res, 400, userData.error);
    req.user = userData;
    next();
  },

  cloudUpload(req, res, next) {
    if (req.files || req.files !== null) {
      if (!req.files.avatar.mimetype.match(/image/g)) {
        return sendResult(res, 400, 'avatar image fomart is invalid');
      }

      cloud.uploader.upload(req.files.avatar.tempFilePath, async (result) => {
        req.imgLink = await result.url;
        next();
      });

      return;
    }
    next();
  },

  checkToken(req, res, next) {
    const token = helper.getToken(req);
    const data = helper.verifyToken(token);
    if (data.error) {
      return sendResult(res, 401, 'You are not authorized');
    }

    req.userData = data;
    return next();
  },

  async checkReceiverExist(req, res, next) {
    const { receiverId } = req.body;
    if (!receiverId) return next();
    const user = await UserService.getUser({ id: receiverId });
    if (user) return next();
    return sendResult(res, 400, 'this user does not exist');
  }
};

export default User;
